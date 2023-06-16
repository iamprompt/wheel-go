import { UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

import { ActiveLang } from '~/decorators/activeLang.decorator'
import { CurrentUser } from '~/decorators/currentUser.decorator'
import { GqlAuthGuard } from '~/guards/GqlAuthGuard'
import { User } from '../user/user.schema'
import { CreateReviewInput } from './dto/createReview.dto'
import { GetReviewsInput } from './dto/getReviews.dto'
import { Review } from './review.schema'
import { ReviewService } from './review.service'

@Resolver()
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {}

  @Query(() => [Review])
  async getReviews(
    @ActiveLang() lang: string,
    @Args('options', { nullable: true }) options?: GetReviewsInput,
  ): Promise<Review[]> {
    return this.reviewService.find(options, lang)
  }

  @Query(() => Review)
  async getReviewById(
    @Args('id', { type: () => ID }) id: string,
    @ActiveLang() lang: string,
  ): Promise<Review> {
    return this.reviewService.findById(id, lang)
  }

  @Query(() => [Review])
  async getReviewsByPlaceId(
    @Args('placeId', { type: () => ID }) placeId: string,
    @ActiveLang() lang: string,
  ): Promise<Review[]> {
    return this.reviewService.findByPlaceId(placeId, lang)
  }

  @Query(() => [Review])
  @UseGuards(GqlAuthGuard)
  async getMyReviews(
    @CurrentUser() user: User,
    @ActiveLang() lang: string,
  ): Promise<Review[]> {
    return this.reviewService.findByUserId(user.id, lang)
  }

  @Mutation(() => Review)
  @UseGuards(GqlAuthGuard)
  async createReview(
    @Args('review') review: CreateReviewInput,
    @ActiveLang() lang: string,
    @CurrentUser() user: User,
  ): Promise<Review> {
    return this.reviewService.create(
      {
        ...review,
        user: user.id,
      },
      lang,
    )
  }

  @Mutation(() => Review)
  async updateReview(
    @Args('id', { type: () => ID }) id: string,
    @Args('review') review: CreateReviewInput,
    @ActiveLang() lang: string,
  ): Promise<Review> {
    return this.reviewService.update(id, review, lang)
  }

  @Mutation(() => Boolean)
  async deleteReview(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    try {
      await this.reviewService.delete(id)
      return true
    } catch (error) {
      throw new Error(error)
    }
  }
}
