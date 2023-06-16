import { createRefToSave } from '~/utils/factory'
import {
  ActivityLog as ActivityLogDB,
  ActivityLogDocument,
} from '~/database/activityLogs/activityLog.schema'
import { ReviewFactory } from '../review/review.factory'
import { RouteFactory } from '../route/route.factory'
import { UserFactory } from '../user/user.factory'
import { ActivityLog } from './activityLog.schema'
import { CreateActivityLogInput } from './activityLog/createActivityLog.dto'

type ReturnActivityLogOrArray<
  T extends ActivityLogDocument | ActivityLogDocument[] | undefined | null,
> = T extends ActivityLogDocument[]
  ? ActivityLog[]
  : T extends ActivityLogDocument
  ? ActivityLog
  : undefined

export class ActivityLogFactory {
  static createFromDatabase<
    T extends ActivityLogDocument | ActivityLogDocument[] | undefined | null,
  >(activityLogs: T, lang = 'th'): ReturnActivityLogOrArray<T> {
    if (!activityLogs) {
      return undefined
    }

    if (Array.isArray(activityLogs)) {
      return <ReturnActivityLogOrArray<T>>(
        activityLogs.map((announcement) =>
          ActivityLogFactory.createFromDatabase(announcement, lang),
        )
      )
    }

    return <ReturnActivityLogOrArray<T>>{
      id: activityLogs._id.toString(),
      action: activityLogs.action,
      point: activityLogs.point,
      review: ReviewFactory.createFromDatabase(activityLogs.review),
      route: RouteFactory.createFromDatabase(activityLogs.route),
      user: UserFactory.createFromDatabase(activityLogs.user),
      createdAt: activityLogs.createdAt,
      updatedAt: activityLogs.updatedAt,
    }
  }

  static createToSave(
    data: CreateActivityLogInput,
    userId: string,
  ): ActivityLogDB {
    return {
      action: data.action,
      point: data.point,
      // @ts-expect-error Only ObjectId is required
      review: createRefToSave(data.review),
      // @ts-expect-error Only ObjectId is required
      route: createRefToSave(data.route),
      // @ts-expect-error Only ObjectId is required
      user: createRefToSave(userId),
    }
  }
}
