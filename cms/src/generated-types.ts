import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export enum Accessibility_Status {
  Accessible = 'ACCESSIBLE',
  Broken = 'BROKEN',
  Inaccessible = 'INACCESSIBLE',
  NeedAssistance = 'NEED_ASSISTANCE',
  Normal = 'NORMAL'
}

export type Announcement = {
  __typename?: 'Announcement';
  content?: Maybe<LanguageObject>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Media>>;
  location?: Maybe<Location>;
  metadata?: Maybe<AnnouncementMetadata>;
  place?: Maybe<Place>;
  status: Status;
  tags?: Maybe<Array<Scalars['String']>>;
  title?: Maybe<LanguageObject>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type AnnouncementMetaInput = {
  email?: InputMaybe<Scalars['String']>;
  line?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type AnnouncementMetadata = {
  __typename?: 'AnnouncementMetadata';
  email?: Maybe<Scalars['String']>;
  line?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Badge = {
  __typename?: 'Badge';
  color?: Maybe<Scalars['String']>;
  conditions?: Maybe<Array<BadgeCondition>>;
  description: LanguageObject;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: LanguageObject;
};

export type BadgeCondition = {
  __typename?: 'BadgeCondition';
  color?: Maybe<Scalars['String']>;
  description?: Maybe<LanguageObject>;
  filter?: Maybe<Array<Scalars['String']>>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<LanguageObject>;
  requiredCount?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['String']>;
};

export enum Concern_Types {
  Accessible = 'ACCESSIBLE',
  Hazard = 'HAZARD',
  NeedAssistance = 'NEED_ASSISTANCE',
  None = 'NONE'
}

export type CreateAnnouncementInput = {
  content?: InputMaybe<LanguageObjectInput>;
  images?: InputMaybe<Array<Scalars['String']>>;
  location?: InputMaybe<LocationInput>;
  metadata?: InputMaybe<AnnouncementMetaInput>;
  place?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  title?: InputMaybe<LanguageObjectInput>;
  user?: InputMaybe<Scalars['String']>;
};

export type CreateBadgeConditionInput = {
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<LanguageObjectInput>;
  filter?: InputMaybe<Array<Scalars['String']>>;
  icon?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<LanguageObjectInput>;
  requiredCount?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Scalars['String']>;
};

export type CreateBadgeInput = {
  color?: InputMaybe<Scalars['String']>;
  conditions?: InputMaybe<Array<CreateBadgeConditionInput>>;
  description: LanguageObjectInput;
  icon?: InputMaybe<Scalars['String']>;
  name: LanguageObjectInput;
};

export type CreateFacilityInput = {
  concern?: InputMaybe<Concern_Types>;
  detail?: InputMaybe<LanguageObjectInput>;
  isWarning?: InputMaybe<Scalars['Boolean']>;
  location?: InputMaybe<LocationInput>;
  metadata?: InputMaybe<FacilityMetaInput>;
  parent: Scalars['String'];
  status?: InputMaybe<Status>;
  type?: InputMaybe<Facility_Types>;
};

export type CreatePlaceInput = {
  address?: InputMaybe<LanguageObjectInput>;
  images?: InputMaybe<Array<Scalars['String']>>;
  internalCode?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<LocationInput>;
  metadata?: InputMaybe<PlaceMetaInput>;
  name?: InputMaybe<LanguageObjectInput>;
  status?: InputMaybe<Status>;
  type?: InputMaybe<Place_Types>;
};

export type CreateReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<Scalars['String']>>;
  official?: InputMaybe<OfficialReviewObjectInput>;
  place?: InputMaybe<Scalars['String']>;
  rating?: InputMaybe<RatingObjectInput>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  user?: InputMaybe<Scalars['String']>;
};

export type CreateRouteInput = {
  destination?: InputMaybe<Scalars['String']>;
  distance?: InputMaybe<Scalars['Float']>;
  duration?: InputMaybe<Scalars['Float']>;
  internalCode?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
  paths?: InputMaybe<Array<LocationInput>>;
  status?: InputMaybe<Status>;
  type?: InputMaybe<Route_Types>;
  user?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<UserMetaInput>;
  password: Scalars['String'];
  profileImage?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Roles>;
  username?: InputMaybe<Scalars['String']>;
};

export type ExperiencePoint = {
  __typename?: 'ExperiencePoint';
  level: Scalars['Float'];
  nextLevelPoint: Scalars['Float'];
  point: Scalars['Float'];
};

export enum Facility_Status {
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE',
  Unknown = 'UNKNOWN',
  Warning = 'WARNING'
}

export enum Facility_Types {
  Assistance = 'ASSISTANCE',
  Elevator = 'ELEVATOR',
  Parking = 'PARKING',
  Ramp = 'RAMP',
  Surface = 'SURFACE',
  Toilet = 'TOILET'
}

export type FacilitiesAvailability = {
  __typename?: 'FacilitiesAvailability';
  ASSISTANCE?: Maybe<FacilityAvailability>;
  ELEVATOR?: Maybe<FacilityAvailability>;
  PARKING?: Maybe<FacilityAvailability>;
  RAMP?: Maybe<FacilityAvailability>;
  SURFACE?: Maybe<FacilityAvailability>;
  TOILET?: Maybe<FacilityAvailability>;
};

export type Facility = {
  __typename?: 'Facility';
  concern?: Maybe<Concern_Types>;
  createdAt?: Maybe<Scalars['DateTime']>;
  detail?: Maybe<LanguageObject>;
  id: Scalars['ID'];
  isWarning?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Location>;
  metadata?: Maybe<FacilityMetadata>;
  parent?: Maybe<Place>;
  status?: Maybe<Status>;
  type?: Maybe<Facility_Types>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type FacilityAvailability = {
  __typename?: 'FacilityAvailability';
  rating: Scalars['Float'];
  status: Facility_Status;
};

export type FacilityMetaInput = {
  length?: InputMaybe<Scalars['Float']>;
  rise?: InputMaybe<Scalars['Float']>;
};

export type FacilityMetadata = {
  __typename?: 'FacilityMetadata';
  length?: Maybe<Scalars['Float']>;
  rise?: Maybe<Scalars['Float']>;
};

export type FavoritePlace = {
  __typename?: 'FavoritePlace';
  addedAt?: Maybe<Scalars['DateTime']>;
  place?: Maybe<Place>;
};

export type FavoritePlaceInput = {
  addedAt?: InputMaybe<Scalars['DateTime']>;
  place?: InputMaybe<Scalars['String']>;
};

export type GetAnnouncementsInput = {
  exclude?: InputMaybe<Array<Scalars['String']>>;
  keyword?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  location?: InputMaybe<LocationInput>;
  radius?: InputMaybe<Scalars['Float']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type GetFacilitiesInput = {
  exclude?: InputMaybe<Array<Scalars['String']>>;
  excludeTypes?: InputMaybe<Array<Facility_Types>>;
  keyword?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  location?: InputMaybe<LocationInput>;
  radius?: InputMaybe<Scalars['Float']>;
  types?: InputMaybe<Array<Facility_Types>>;
};

export type GetPlacesInput = {
  exclude?: InputMaybe<Array<Scalars['String']>>;
  excludeTypes?: InputMaybe<Array<Place_Types>>;
  keyword?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  location?: InputMaybe<LocationInput>;
  radius?: InputMaybe<Scalars['Float']>;
  types?: InputMaybe<Array<Place_Types>>;
};

export type GetReviewsInput = {
  exclude?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Float']>;
};

export type GetRoutesInput = {
  destination?: InputMaybe<Scalars['String']>;
  exclude?: InputMaybe<Array<Scalars['String']>>;
  limit?: InputMaybe<Scalars['Float']>;
  origin?: InputMaybe<Scalars['String']>;
};

export type LanguageObject = {
  __typename?: 'LanguageObject';
  en?: Maybe<Scalars['String']>;
  th?: Maybe<Scalars['String']>;
};

export type LanguageObjectInput = {
  en?: InputMaybe<Scalars['String']>;
  th?: InputMaybe<Scalars['String']>;
};

export type Location = {
  __typename?: 'Location';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type LocationInput = {
  lat?: InputMaybe<Scalars['String']>;
  lng?: InputMaybe<Scalars['String']>;
};

export type Media = {
  __typename?: 'Media';
  createdAt?: Maybe<Scalars['DateTime']>;
  filename?: Maybe<Scalars['String']>;
  filesize?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  mimetype?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFavoritePlace: User;
  createAnnouncement: Announcement;
  createBadge: Badge;
  createFacility: Facility;
  createPlace: Place;
  createReview: Review;
  createRoute: Route;
  createUser: User;
  deleteAnnouncement: Scalars['Boolean'];
  deleteBadge: Badge;
  deleteFacility: Scalars['Boolean'];
  deletePlace: Scalars['Boolean'];
  deleteReview: Scalars['Boolean'];
  deleteRoute: Scalars['Boolean'];
  login: AuthResponse;
  refresh: AuthResponse;
  register: AuthResponse;
  removeFavoritePlace: User;
  updateAnnouncement: Announcement;
  updateBadge: Badge;
  updateFacility: Facility;
  updatePlace: Place;
  updateReview: Review;
  updateRoute: Route;
  updateUser: User;
  uploadMedia: Media;
};


export type MutationAddFavoritePlaceArgs = {
  placeId: Scalars['String'];
};


export type MutationCreateAnnouncementArgs = {
  data: CreateAnnouncementInput;
};


export type MutationCreateBadgeArgs = {
  data: CreateBadgeInput;
};


export type MutationCreateFacilityArgs = {
  data: CreateFacilityInput;
};


export type MutationCreatePlaceArgs = {
  data: CreatePlaceInput;
};


export type MutationCreateReviewArgs = {
  review: CreateReviewInput;
};


export type MutationCreateRouteArgs = {
  data: CreateRouteInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeleteAnnouncementArgs = {
  id: Scalars['String'];
};


export type MutationDeleteBadgeArgs = {
  id: Scalars['String'];
};


export type MutationDeleteFacilityArgs = {
  id: Scalars['String'];
};


export type MutationDeletePlaceArgs = {
  id: Scalars['String'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRouteArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRefreshArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationRemoveFavoritePlaceArgs = {
  placeId: Scalars['String'];
};


export type MutationUpdateAnnouncementArgs = {
  data: CreateAnnouncementInput;
  id: Scalars['String'];
};


export type MutationUpdateBadgeArgs = {
  data: CreateBadgeInput;
  id: Scalars['String'];
};


export type MutationUpdateFacilityArgs = {
  data: CreateFacilityInput;
  id: Scalars['String'];
};


export type MutationUpdatePlaceArgs = {
  data: CreatePlaceInput;
  id: Scalars['String'];
};


export type MutationUpdateReviewArgs = {
  id: Scalars['ID'];
  review: CreateReviewInput;
};


export type MutationUpdateRouteArgs = {
  data: CreateRouteInput;
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id?: InputMaybe<Scalars['String']>;
};


export type MutationUploadMediaArgs = {
  file: Scalars['Upload'];
};

export type OfficialReviewObject = {
  __typename?: 'OfficialReviewObject';
  comment?: Maybe<Scalars['String']>;
  isFlagged?: Maybe<Scalars['Boolean']>;
  timestamp?: Maybe<Scalars['DateTime']>;
};

export type OfficialReviewObjectInput = {
  comment?: InputMaybe<Scalars['String']>;
  isFlagged?: InputMaybe<Scalars['Boolean']>;
  timestamp?: InputMaybe<Scalars['DateTime']>;
};

export enum Place_Types {
  Building = 'BUILDING',
  Cafe = 'CAFE',
  Curbcut = 'CURBCUT',
  Food = 'FOOD',
  Park = 'PARK',
  Parking = 'PARKING',
  Residence = 'RESIDENCE',
  Sport = 'SPORT',
  Toilet = 'TOILET',
  Transport = 'TRANSPORT'
}

export type Place = {
  __typename?: 'Place';
  address?: Maybe<LanguageObject>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Media>>;
  internalCode?: Maybe<Scalars['String']>;
  location?: Maybe<Location>;
  metadata?: Maybe<PlaceMetadata>;
  name?: Maybe<LanguageObject>;
  rating?: Maybe<Scalars['Float']>;
  status?: Maybe<Status>;
  type?: Maybe<Place_Types>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PlaceMetaInput = {
  accessibility?: InputMaybe<Accessibility_Status>;
  busLines?: InputMaybe<Array<Scalars['String']>>;
  phone?: InputMaybe<Scalars['String']>;
  tramLines?: InputMaybe<Array<Scalars['String']>>;
  website?: InputMaybe<Scalars['String']>;
};

export type PlaceMetadata = {
  __typename?: 'PlaceMetadata';
  accessibility?: Maybe<Accessibility_Status>;
  busLines?: Maybe<Array<Scalars['String']>>;
  phone?: Maybe<Scalars['String']>;
  tramLines?: Maybe<Array<Scalars['String']>>;
  website?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getAnnouncementById: Announcement;
  getAnnouncements: Array<Announcement>;
  getBadgeById: Badge;
  getBadges: Array<Badge>;
  getFacilities: Array<Facility>;
  getFacilitiesByPlaceId: Array<Facility>;
  getFacilityById: Facility;
  getMedia: Array<Media>;
  getMediaById: Media;
  getMyBadges: Array<UserBadge>;
  getMyExperiencePoint: ExperiencePoint;
  getMyReviews: Array<Review>;
  getMySummary: UserSummary;
  getMyTracedRoutes: Array<Route>;
  getPlaceById: Place;
  getPlaces: Array<Place>;
  getRatingSummaryByPlaceId: RatingSummary;
  getRatingSummaryByPlaceIds: Array<RatingSummary>;
  getReviewById: Review;
  getReviews: Array<Review>;
  getReviewsByPlaceId: Array<Review>;
  getRouteById: Route;
  getRoutes: Array<Route>;
  getUserById: User;
  getUsers: Array<User>;
  isFavoritePlace: Scalars['Boolean'];
  me: User;
};


export type QueryGetAnnouncementByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetAnnouncementsArgs = {
  options?: InputMaybe<GetAnnouncementsInput>;
};


export type QueryGetFacilitiesArgs = {
  options?: InputMaybe<GetFacilitiesInput>;
};


export type QueryGetFacilitiesByPlaceIdArgs = {
  placeId: Scalars['String'];
};


export type QueryGetFacilityByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetMediaByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetPlaceByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetPlacesArgs = {
  options?: InputMaybe<GetPlacesInput>;
};


export type QueryGetRatingSummaryByPlaceIdArgs = {
  id: Scalars['String'];
};


export type QueryGetRatingSummaryByPlaceIdsArgs = {
  ids: Array<Scalars['String']>;
};


export type QueryGetReviewByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetReviewsArgs = {
  options?: InputMaybe<GetReviewsInput>;
};


export type QueryGetReviewsByPlaceIdArgs = {
  placeId: Scalars['ID'];
};


export type QueryGetRouteByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetRoutesArgs = {
  options?: InputMaybe<GetRoutesInput>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryIsFavoritePlaceArgs = {
  placeId: Scalars['String'];
};

/** Roles of the user */
export enum Roles {
  /** Admin */
  Admin = 'ADMIN',
  /** User */
  User = 'USER'
}

/** Type of the route */
export enum Route_Types {
  /** Pre-defined route */
  PreDefined = 'PRE_DEFINED',
  /** Traced route */
  Traced = 'TRACED'
}

export type RatingObject = {
  __typename?: 'RatingObject';
  assistance?: Maybe<Scalars['Float']>;
  elevator?: Maybe<Scalars['Float']>;
  overall?: Maybe<Scalars['Float']>;
  parking?: Maybe<Scalars['Float']>;
  ramp?: Maybe<Scalars['Float']>;
  surface?: Maybe<Scalars['Float']>;
  toilet?: Maybe<Scalars['Float']>;
};

export type RatingObjectInput = {
  assistance?: InputMaybe<Scalars['Float']>;
  elevator?: InputMaybe<Scalars['Float']>;
  overall?: InputMaybe<Scalars['Float']>;
  parking?: InputMaybe<Scalars['Float']>;
  ramp?: InputMaybe<Scalars['Float']>;
  surface?: InputMaybe<Scalars['Float']>;
  toilet?: InputMaybe<Scalars['Float']>;
};

export type RatingSummary = {
  __typename?: 'RatingSummary';
  facilities: FacilitiesAvailability;
  id: Scalars['ID'];
  overall: Scalars['Float'];
  reviewCount: Scalars['Int'];
  tags: Array<RatingTagCount>;
};

export type RatingTagCount = {
  __typename?: 'RatingTagCount';
  count: Scalars['Float'];
  tag: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  metadata?: InputMaybe<UserMetaInput>;
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  comment?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Media>>;
  official?: Maybe<OfficialReviewObject>;
  place?: Maybe<Place>;
  rating?: Maybe<RatingObject>;
  tags?: Maybe<Array<Scalars['String']>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type Route = {
  __typename?: 'Route';
  createdAt?: Maybe<Scalars['DateTime']>;
  destination?: Maybe<Place>;
  distance?: Maybe<Scalars['Float']>;
  duration?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  internalCode?: Maybe<Scalars['String']>;
  origin?: Maybe<Place>;
  paths?: Maybe<Array<Location>>;
  status?: Maybe<Status>;
  type?: Maybe<Route_Types>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

/** Status of the document */
export enum Status {
  /** Draft (not published) */
  Draft = 'DRAFT',
  /** Published */
  Published = 'PUBLISHED'
}

export type UpdateUserInput = {
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<UserMetaInput>;
  profileImage?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Roles>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  badges?: Maybe<Array<UserBadge>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastname?: Maybe<Scalars['String']>;
  metadata?: Maybe<UserMetadata>;
  profileImage?: Maybe<Media>;
  role?: Maybe<Roles>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username?: Maybe<Scalars['String']>;
};

export type UserBadge = {
  __typename?: 'UserBadge';
  badge: Badge;
  isSeen: Scalars['Boolean'];
  timestamp: Scalars['DateTime'];
};

export type UserMetaInput = {
  equipment?: InputMaybe<Scalars['String']>;
  favorites?: InputMaybe<Array<FavoritePlaceInput>>;
  impairmentLevel?: InputMaybe<Scalars['String']>;
};

export type UserMetadata = {
  __typename?: 'UserMetadata';
  equipment?: Maybe<Scalars['String']>;
  favorites?: Maybe<Array<FavoritePlace>>;
  impairmentLevel?: Maybe<Scalars['String']>;
};

export type UserSummary = {
  __typename?: 'UserSummary';
  distance: Scalars['Float'];
  joinedAt?: Maybe<Scalars['DateTime']>;
  reviews: Scalars['Int'];
  routes: Scalars['Int'];
};

export type CreateAnnouncementMutationVariables = Exact<{
  data: CreateAnnouncementInput;
}>;


export type CreateAnnouncementMutation = { __typename?: 'Mutation', createAnnouncement: { __typename?: 'Announcement', id: string, tags?: Array<string> | null, status: Status, createdAt?: any | null, updatedAt?: any | null, title?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, content?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, place?: { __typename?: 'Place', id: string } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, images?: Array<{ __typename?: 'Media', id: string, filename?: string | null, mimetype?: string | null, filesize?: number | null, width?: number | null, height?: number | null, url?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null, metadata?: { __typename?: 'AnnouncementMetadata', line?: string | null, email?: string | null, phone?: string | null } | null, user?: { __typename?: 'User', id: string } | null } };

export type UpdateAnnouncementMutationVariables = Exact<{
  id: Scalars['String'];
  data: CreateAnnouncementInput;
}>;


export type UpdateAnnouncementMutation = { __typename?: 'Mutation', updateAnnouncement: { __typename?: 'Announcement', id: string, tags?: Array<string> | null, status: Status, createdAt?: any | null, updatedAt?: any | null, title?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, content?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, place?: { __typename?: 'Place', id: string } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, images?: Array<{ __typename?: 'Media', id: string, filename?: string | null, mimetype?: string | null, filesize?: number | null, width?: number | null, height?: number | null, url?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null, metadata?: { __typename?: 'AnnouncementMetadata', line?: string | null, email?: string | null, phone?: string | null } | null, user?: { __typename?: 'User', id: string } | null } };

export type DeleteAnnouncementMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAnnouncementMutation = { __typename?: 'Mutation', deleteAnnouncement: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refresh: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type CreateFacilityMutationVariables = Exact<{
  data: CreateFacilityInput;
}>;


export type CreateFacilityMutation = { __typename?: 'Mutation', createFacility: { __typename?: 'Facility', id: string, type?: Facility_Types | null, concern?: Concern_Types | null, isWarning?: boolean | null, status?: Status | null, createdAt?: any | null, updatedAt?: any | null, parent?: { __typename?: 'Place', id: string } | null, detail?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, metadata?: { __typename?: 'FacilityMetadata', length?: number | null, rise?: number | null } | null } };

export type UpdateFacilityMutationVariables = Exact<{
  id: Scalars['String'];
  data: CreateFacilityInput;
}>;


export type UpdateFacilityMutation = { __typename?: 'Mutation', updateFacility: { __typename?: 'Facility', id: string, type?: Facility_Types | null, concern?: Concern_Types | null, isWarning?: boolean | null, status?: Status | null, createdAt?: any | null, updatedAt?: any | null, parent?: { __typename?: 'Place', id: string } | null, detail?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, metadata?: { __typename?: 'FacilityMetadata', length?: number | null, rise?: number | null } | null } };

export type DeleteFacilityMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteFacilityMutation = { __typename?: 'Mutation', deleteFacility: boolean };

export type UploadMediaMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadMediaMutation = { __typename?: 'Mutation', uploadMedia: { __typename?: 'Media', id: string, url?: string | null, filename?: string | null } };

export type CreatePlaceMutationVariables = Exact<{
  data: CreatePlaceInput;
}>;


export type CreatePlaceMutation = { __typename?: 'Mutation', createPlace: { __typename?: 'Place', id: string, type?: Place_Types | null, internalCode?: string | null, status?: Status | null, createdAt?: any | null, updatedAt?: any | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, address?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, images?: Array<{ __typename?: 'Media', id: string, filename?: string | null, mimetype?: string | null, filesize?: number | null, width?: number | null, height?: number | null, url?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null, metadata?: { __typename?: 'PlaceMetadata', website?: string | null, phone?: string | null, busLines?: Array<string> | null, tramLines?: Array<string> | null, accessibility?: Accessibility_Status | null } | null } };

export type UpdatePlaceMutationVariables = Exact<{
  id: Scalars['String'];
  data: CreatePlaceInput;
}>;


export type UpdatePlaceMutation = { __typename?: 'Mutation', updatePlace: { __typename?: 'Place', id: string, type?: Place_Types | null, internalCode?: string | null, status?: Status | null, createdAt?: any | null, updatedAt?: any | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, address?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, images?: Array<{ __typename?: 'Media', id: string, filename?: string | null, mimetype?: string | null, filesize?: number | null, width?: number | null, height?: number | null, url?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null, metadata?: { __typename?: 'PlaceMetadata', website?: string | null, phone?: string | null, busLines?: Array<string> | null, tramLines?: Array<string> | null, accessibility?: Accessibility_Status | null } | null } };

export type DeletePlaceMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeletePlaceMutation = { __typename?: 'Mutation', deletePlace: boolean };

export type UpdateReviewMutationVariables = Exact<{
  id: Scalars['ID'];
  review: CreateReviewInput;
}>;


export type UpdateReviewMutation = { __typename?: 'Mutation', updateReview: { __typename?: 'Review', comment?: string | null, place?: { __typename?: 'Place', id: string } | null, official?: { __typename?: 'OfficialReviewObject', isFlagged?: boolean | null, comment?: string | null } | null } };

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteReviewMutation = { __typename?: 'Mutation', deleteReview: boolean };

export type GetAnnouncementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAnnouncementsQuery = { __typename?: 'Query', getAnnouncements: Array<{ __typename?: 'Announcement', id: string, updatedAt?: any | null, status: Status, title?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, content?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null }> };

export type GetAnnouncementsAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAnnouncementsAllQuery = { __typename?: 'Query', getAnnouncements: Array<{ __typename?: 'Announcement', id: string, tags?: Array<string> | null, status: Status, updatedAt?: any | null, createdAt?: any | null, title?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, content?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, place?: { __typename?: 'Place', id: string, name?: { __typename?: 'LanguageObject', en?: string | null, th?: string | null } | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, metadata?: { __typename?: 'AnnouncementMetadata', line?: string | null, email?: string | null, phone?: string | null } | null }> };

export type GetAnnouncementByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAnnouncementByIdQuery = { __typename?: 'Query', getAnnouncementById: { __typename?: 'Announcement', id: string, tags?: Array<string> | null, status: Status, updatedAt?: any | null, createdAt?: any | null, title?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, content?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, place?: { __typename?: 'Place', id: string } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, images?: Array<{ __typename?: 'Media', id: string, filename?: string | null, mimetype?: string | null, filesize?: number | null, width?: number | null, height?: number | null, url?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null, metadata?: { __typename?: 'AnnouncementMetadata', line?: string | null, email?: string | null, phone?: string | null } | null } };

export type GetFacilitiesByPlaceIdQueryVariables = Exact<{
  placeId: Scalars['String'];
}>;


export type GetFacilitiesByPlaceIdQuery = { __typename?: 'Query', getFacilitiesByPlaceId: Array<{ __typename?: 'Facility', id: string, type?: Facility_Types | null, concern?: Concern_Types | null, status?: Status | null, createdAt?: any | null, updatedAt?: any | null, isWarning?: boolean | null, parent?: { __typename?: 'Place', id: string } | null, detail?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, metadata?: { __typename?: 'FacilityMetadata', length?: number | null, rise?: number | null } | null }> };

export type GetFacilityByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetFacilityByIdQuery = { __typename?: 'Query', getFacilityById: { __typename?: 'Facility', id: string, type?: Facility_Types | null, concern?: Concern_Types | null, status?: Status | null, createdAt?: any | null, updatedAt?: any | null, isWarning?: boolean | null, parent?: { __typename?: 'Place', id: string } | null, detail?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, metadata?: { __typename?: 'FacilityMetadata', length?: number | null, rise?: number | null } | null } };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, username?: string | null, role?: Roles | null } };

export type GetPlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlacesQuery = { __typename?: 'Query', getPlaces: Array<{ __typename?: 'Place', id: string, type?: Place_Types | null, internalCode?: string | null, status?: Status | null, updatedAt?: any | null, name?: { __typename?: 'LanguageObject', en?: string | null, th?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null }> };

export type GetPlacesAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlacesAllQuery = { __typename?: 'Query', getPlaces: Array<{ __typename?: 'Place', id: string, type?: Place_Types | null, internalCode?: string | null, status?: Status | null, createdAt?: any | null, updatedAt?: any | null, name?: { __typename?: 'LanguageObject', en?: string | null, th?: string | null } | null, address?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, images?: Array<{ __typename?: 'Media', url?: string | null }> | null, metadata?: { __typename?: 'PlaceMetadata', website?: string | null, phone?: string | null, busLines?: Array<string> | null, tramLines?: Array<string> | null, accessibility?: Accessibility_Status | null } | null }> };

export type GetPlaceByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPlaceByIdQuery = { __typename?: 'Query', getPlaceById: { __typename?: 'Place', id: string, type?: Place_Types | null, internalCode?: string | null, status?: Status | null, createdAt?: any | null, updatedAt?: any | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, address?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, images?: Array<{ __typename?: 'Media', id: string, filename?: string | null, mimetype?: string | null, filesize?: number | null, width?: number | null, height?: number | null, url?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null, metadata?: { __typename?: 'PlaceMetadata', website?: string | null, phone?: string | null, busLines?: Array<string> | null, tramLines?: Array<string> | null, accessibility?: Accessibility_Status | null } | null } };

export type GetPlaceNameByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPlaceNameByIdQuery = { __typename?: 'Query', getPlaceById: { __typename?: 'Place', id: string, internalCode?: string | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null } };

export type GetReviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReviewsQuery = { __typename?: 'Query', getReviews: Array<{ __typename?: 'Review', id: string, comment?: string | null, updatedAt?: any | null, place?: { __typename?: 'Place', id: string, internalCode?: string | null, name?: { __typename?: 'LanguageObject', en?: string | null, th?: string | null } | null } | null, user?: { __typename?: 'User', username?: string | null, firstname?: string | null, lastname?: string | null } | null, rating?: { __typename?: 'RatingObject', overall?: number | null } | null, official?: { __typename?: 'OfficialReviewObject', isFlagged?: boolean | null } | null }> };

export type GetReviewsAllQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReviewsAllQuery = { __typename?: 'Query', getReviews: Array<{ __typename?: 'Review', id: string, comment?: string | null, tags?: Array<string> | null, createdAt?: any | null, updatedAt?: any | null, place?: { __typename?: 'Place', id: string, name?: { __typename?: 'LanguageObject', en?: string | null, th?: string | null } | null } | null, user?: { __typename?: 'User', username?: string | null, firstname?: string | null, lastname?: string | null } | null, rating?: { __typename?: 'RatingObject', overall?: number | null, ramp?: number | null, assistance?: number | null, elevator?: number | null, parking?: number | null, surface?: number | null, toilet?: number | null } | null, images?: Array<{ __typename?: 'Media', url?: string | null }> | null, official?: { __typename?: 'OfficialReviewObject', isFlagged?: boolean | null, comment?: string | null, timestamp?: any | null } | null }> };

export type GetReviewByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetReviewByIdQuery = { __typename?: 'Query', getReviewById: { __typename?: 'Review', id: string, comment?: string | null, tags?: Array<string> | null, createdAt?: any | null, updatedAt?: any | null, place?: { __typename?: 'Place', id: string, internalCode?: string | null, type?: Place_Types | null, name?: { __typename?: 'LanguageObject', en?: string | null, th?: string | null } | null } | null, user?: { __typename?: 'User', username?: string | null, firstname?: string | null, lastname?: string | null } | null, rating?: { __typename?: 'RatingObject', overall?: number | null, ramp?: number | null, assistance?: number | null, elevator?: number | null, parking?: number | null, surface?: number | null, toilet?: number | null } | null, images?: Array<{ __typename?: 'Media', id: string, filename?: string | null, mimetype?: string | null, filesize?: number | null, width?: number | null, height?: number | null, url?: string | null, createdAt?: any | null, updatedAt?: any | null }> | null, official?: { __typename?: 'OfficialReviewObject', isFlagged?: boolean | null, comment?: string | null, timestamp?: any | null } | null } };

export type GetAllRoutesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRoutesQuery = { __typename?: 'Query', getRoutes: Array<{ __typename?: 'Route', id: string }> };

export type GetAllAnnouncementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAnnouncementsQuery = { __typename?: 'Query', getAnnouncements: Array<{ __typename?: 'Announcement', id: string }> };

export type GetAllPlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPlacesQuery = { __typename?: 'Query', getPlaces: Array<{ __typename?: 'Place', id: string }> };

export type GetAllReviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReviewsQuery = { __typename?: 'Query', getReviews: Array<{ __typename?: 'Review', id: string }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, metadata?: { __typename?: 'UserMetadata', impairmentLevel?: string | null } | null }> };

export type GetRoutePathsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRoutePathsQuery = { __typename?: 'Query', getRoutes: Array<{ __typename?: 'Route', id: string, paths?: Array<{ __typename?: 'Location', lat: number, lng: number }> | null }> };


export const CreateAnnouncementDocument = gql`
    mutation CreateAnnouncement($data: CreateAnnouncementInput!) {
  createAnnouncement(data: $data) {
    id
    title {
      th
      en
    }
    content {
      th
      en
    }
    place {
      id
    }
    location {
      lat
      lng
    }
    images {
      id
      filename
      mimetype
      filesize
      width
      height
      url
      createdAt
      updatedAt
    }
    tags
    metadata {
      line
      email
      phone
    }
    user {
      id
    }
    status
    createdAt
    updatedAt
  }
}
    `;
export type CreateAnnouncementMutationFn = Apollo.MutationFunction<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>;

/**
 * __useCreateAnnouncementMutation__
 *
 * To run a mutation, you first call `useCreateAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnnouncementMutation, { data, loading, error }] = useCreateAnnouncementMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>(CreateAnnouncementDocument, options);
      }
export type CreateAnnouncementMutationHookResult = ReturnType<typeof useCreateAnnouncementMutation>;
export type CreateAnnouncementMutationResult = Apollo.MutationResult<CreateAnnouncementMutation>;
export type CreateAnnouncementMutationOptions = Apollo.BaseMutationOptions<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>;
export const UpdateAnnouncementDocument = gql`
    mutation UpdateAnnouncement($id: String!, $data: CreateAnnouncementInput!) {
  updateAnnouncement(id: $id, data: $data) {
    id
    title {
      th
      en
    }
    content {
      th
      en
    }
    place {
      id
    }
    location {
      lat
      lng
    }
    images {
      id
      filename
      mimetype
      filesize
      width
      height
      url
      createdAt
      updatedAt
    }
    tags
    metadata {
      line
      email
      phone
    }
    user {
      id
    }
    status
    createdAt
    updatedAt
  }
}
    `;
export type UpdateAnnouncementMutationFn = Apollo.MutationFunction<UpdateAnnouncementMutation, UpdateAnnouncementMutationVariables>;

/**
 * __useUpdateAnnouncementMutation__
 *
 * To run a mutation, you first call `useUpdateAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAnnouncementMutation, { data, loading, error }] = useUpdateAnnouncementMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAnnouncementMutation, UpdateAnnouncementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAnnouncementMutation, UpdateAnnouncementMutationVariables>(UpdateAnnouncementDocument, options);
      }
export type UpdateAnnouncementMutationHookResult = ReturnType<typeof useUpdateAnnouncementMutation>;
export type UpdateAnnouncementMutationResult = Apollo.MutationResult<UpdateAnnouncementMutation>;
export type UpdateAnnouncementMutationOptions = Apollo.BaseMutationOptions<UpdateAnnouncementMutation, UpdateAnnouncementMutationVariables>;
export const DeleteAnnouncementDocument = gql`
    mutation DeleteAnnouncement($id: String!) {
  deleteAnnouncement(id: $id)
}
    `;
export type DeleteAnnouncementMutationFn = Apollo.MutationFunction<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>;

/**
 * __useDeleteAnnouncementMutation__
 *
 * To run a mutation, you first call `useDeleteAnnouncementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAnnouncementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAnnouncementMutation, { data, loading, error }] = useDeleteAnnouncementMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAnnouncementMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>(DeleteAnnouncementDocument, options);
      }
export type DeleteAnnouncementMutationHookResult = ReturnType<typeof useDeleteAnnouncementMutation>;
export type DeleteAnnouncementMutationResult = Apollo.MutationResult<DeleteAnnouncementMutation>;
export type DeleteAnnouncementMutationOptions = Apollo.BaseMutationOptions<DeleteAnnouncementMutation, DeleteAnnouncementMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation RefreshToken($refreshToken: String!) {
  refresh(refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const CreateFacilityDocument = gql`
    mutation CreateFacility($data: CreateFacilityInput!) {
  createFacility(data: $data) {
    id
    type
    parent {
      id
    }
    detail {
      th
      en
    }
    location {
      lat
      lng
    }
    concern
    isWarning
    metadata {
      length
      rise
    }
    status
    createdAt
    updatedAt
  }
}
    `;
export type CreateFacilityMutationFn = Apollo.MutationFunction<CreateFacilityMutation, CreateFacilityMutationVariables>;

/**
 * __useCreateFacilityMutation__
 *
 * To run a mutation, you first call `useCreateFacilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFacilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFacilityMutation, { data, loading, error }] = useCreateFacilityMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFacilityMutation(baseOptions?: Apollo.MutationHookOptions<CreateFacilityMutation, CreateFacilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFacilityMutation, CreateFacilityMutationVariables>(CreateFacilityDocument, options);
      }
export type CreateFacilityMutationHookResult = ReturnType<typeof useCreateFacilityMutation>;
export type CreateFacilityMutationResult = Apollo.MutationResult<CreateFacilityMutation>;
export type CreateFacilityMutationOptions = Apollo.BaseMutationOptions<CreateFacilityMutation, CreateFacilityMutationVariables>;
export const UpdateFacilityDocument = gql`
    mutation UpdateFacility($id: String!, $data: CreateFacilityInput!) {
  updateFacility(id: $id, data: $data) {
    id
    type
    parent {
      id
    }
    detail {
      th
      en
    }
    location {
      lat
      lng
    }
    concern
    isWarning
    metadata {
      length
      rise
    }
    status
    createdAt
    updatedAt
  }
}
    `;
export type UpdateFacilityMutationFn = Apollo.MutationFunction<UpdateFacilityMutation, UpdateFacilityMutationVariables>;

/**
 * __useUpdateFacilityMutation__
 *
 * To run a mutation, you first call `useUpdateFacilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFacilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFacilityMutation, { data, loading, error }] = useUpdateFacilityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFacilityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFacilityMutation, UpdateFacilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFacilityMutation, UpdateFacilityMutationVariables>(UpdateFacilityDocument, options);
      }
export type UpdateFacilityMutationHookResult = ReturnType<typeof useUpdateFacilityMutation>;
export type UpdateFacilityMutationResult = Apollo.MutationResult<UpdateFacilityMutation>;
export type UpdateFacilityMutationOptions = Apollo.BaseMutationOptions<UpdateFacilityMutation, UpdateFacilityMutationVariables>;
export const DeleteFacilityDocument = gql`
    mutation DeleteFacility($id: String!) {
  deleteFacility(id: $id)
}
    `;
export type DeleteFacilityMutationFn = Apollo.MutationFunction<DeleteFacilityMutation, DeleteFacilityMutationVariables>;

/**
 * __useDeleteFacilityMutation__
 *
 * To run a mutation, you first call `useDeleteFacilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFacilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFacilityMutation, { data, loading, error }] = useDeleteFacilityMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFacilityMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFacilityMutation, DeleteFacilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFacilityMutation, DeleteFacilityMutationVariables>(DeleteFacilityDocument, options);
      }
export type DeleteFacilityMutationHookResult = ReturnType<typeof useDeleteFacilityMutation>;
export type DeleteFacilityMutationResult = Apollo.MutationResult<DeleteFacilityMutation>;
export type DeleteFacilityMutationOptions = Apollo.BaseMutationOptions<DeleteFacilityMutation, DeleteFacilityMutationVariables>;
export const UploadMediaDocument = gql`
    mutation UploadMedia($file: Upload!) {
  uploadMedia(file: $file) {
    id
    url
    filename
  }
}
    `;
export type UploadMediaMutationFn = Apollo.MutationFunction<UploadMediaMutation, UploadMediaMutationVariables>;

/**
 * __useUploadMediaMutation__
 *
 * To run a mutation, you first call `useUploadMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadMediaMutation, { data, loading, error }] = useUploadMediaMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadMediaMutation(baseOptions?: Apollo.MutationHookOptions<UploadMediaMutation, UploadMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadMediaMutation, UploadMediaMutationVariables>(UploadMediaDocument, options);
      }
export type UploadMediaMutationHookResult = ReturnType<typeof useUploadMediaMutation>;
export type UploadMediaMutationResult = Apollo.MutationResult<UploadMediaMutation>;
export type UploadMediaMutationOptions = Apollo.BaseMutationOptions<UploadMediaMutation, UploadMediaMutationVariables>;
export const CreatePlaceDocument = gql`
    mutation CreatePlace($data: CreatePlaceInput!) {
  createPlace(data: $data) {
    id
    type
    name {
      th
      en
    }
    address {
      th
      en
    }
    location {
      lat
      lng
    }
    images {
      id
      filename
      mimetype
      filesize
      width
      height
      url
      createdAt
      updatedAt
    }
    internalCode
    metadata {
      website
      phone
      busLines
      tramLines
      accessibility
    }
    status
    createdAt
    updatedAt
  }
}
    `;
export type CreatePlaceMutationFn = Apollo.MutationFunction<CreatePlaceMutation, CreatePlaceMutationVariables>;

/**
 * __useCreatePlaceMutation__
 *
 * To run a mutation, you first call `useCreatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaceMutation, { data, loading, error }] = useCreatePlaceMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePlaceMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlaceMutation, CreatePlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlaceMutation, CreatePlaceMutationVariables>(CreatePlaceDocument, options);
      }
export type CreatePlaceMutationHookResult = ReturnType<typeof useCreatePlaceMutation>;
export type CreatePlaceMutationResult = Apollo.MutationResult<CreatePlaceMutation>;
export type CreatePlaceMutationOptions = Apollo.BaseMutationOptions<CreatePlaceMutation, CreatePlaceMutationVariables>;
export const UpdatePlaceDocument = gql`
    mutation UpdatePlace($id: String!, $data: CreatePlaceInput!) {
  updatePlace(id: $id, data: $data) {
    id
    type
    name {
      th
      en
    }
    address {
      th
      en
    }
    location {
      lat
      lng
    }
    images {
      id
      filename
      mimetype
      filesize
      width
      height
      url
      createdAt
      updatedAt
    }
    internalCode
    metadata {
      website
      phone
      busLines
      tramLines
      accessibility
    }
    status
    createdAt
    updatedAt
  }
}
    `;
export type UpdatePlaceMutationFn = Apollo.MutationFunction<UpdatePlaceMutation, UpdatePlaceMutationVariables>;

/**
 * __useUpdatePlaceMutation__
 *
 * To run a mutation, you first call `useUpdatePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlaceMutation, { data, loading, error }] = useUpdatePlaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePlaceMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePlaceMutation, UpdatePlaceMutationVariables>(UpdatePlaceDocument, options);
      }
export type UpdatePlaceMutationHookResult = ReturnType<typeof useUpdatePlaceMutation>;
export type UpdatePlaceMutationResult = Apollo.MutationResult<UpdatePlaceMutation>;
export type UpdatePlaceMutationOptions = Apollo.BaseMutationOptions<UpdatePlaceMutation, UpdatePlaceMutationVariables>;
export const DeletePlaceDocument = gql`
    mutation DeletePlace($id: String!) {
  deletePlace(id: $id)
}
    `;
export type DeletePlaceMutationFn = Apollo.MutationFunction<DeletePlaceMutation, DeletePlaceMutationVariables>;

/**
 * __useDeletePlaceMutation__
 *
 * To run a mutation, you first call `useDeletePlaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlaceMutation, { data, loading, error }] = useDeletePlaceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePlaceMutation(baseOptions?: Apollo.MutationHookOptions<DeletePlaceMutation, DeletePlaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePlaceMutation, DeletePlaceMutationVariables>(DeletePlaceDocument, options);
      }
export type DeletePlaceMutationHookResult = ReturnType<typeof useDeletePlaceMutation>;
export type DeletePlaceMutationResult = Apollo.MutationResult<DeletePlaceMutation>;
export type DeletePlaceMutationOptions = Apollo.BaseMutationOptions<DeletePlaceMutation, DeletePlaceMutationVariables>;
export const UpdateReviewDocument = gql`
    mutation UpdateReview($id: ID!, $review: CreateReviewInput!) {
  updateReview(id: $id, review: $review) {
    place {
      id
    }
    comment
    official {
      isFlagged
      comment
    }
  }
}
    `;
export type UpdateReviewMutationFn = Apollo.MutationFunction<UpdateReviewMutation, UpdateReviewMutationVariables>;

/**
 * __useUpdateReviewMutation__
 *
 * To run a mutation, you first call `useUpdateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReviewMutation, { data, loading, error }] = useUpdateReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *      review: // value for 'review'
 *   },
 * });
 */
export function useUpdateReviewMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReviewMutation, UpdateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReviewMutation, UpdateReviewMutationVariables>(UpdateReviewDocument, options);
      }
export type UpdateReviewMutationHookResult = ReturnType<typeof useUpdateReviewMutation>;
export type UpdateReviewMutationResult = Apollo.MutationResult<UpdateReviewMutation>;
export type UpdateReviewMutationOptions = Apollo.BaseMutationOptions<UpdateReviewMutation, UpdateReviewMutationVariables>;
export const DeleteReviewDocument = gql`
    mutation DeleteReview($id: ID!) {
  deleteReview(id: $id)
}
    `;
export type DeleteReviewMutationFn = Apollo.MutationFunction<DeleteReviewMutation, DeleteReviewMutationVariables>;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteReviewMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReviewMutation, DeleteReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReviewMutation, DeleteReviewMutationVariables>(DeleteReviewDocument, options);
      }
export type DeleteReviewMutationHookResult = ReturnType<typeof useDeleteReviewMutation>;
export type DeleteReviewMutationResult = Apollo.MutationResult<DeleteReviewMutation>;
export type DeleteReviewMutationOptions = Apollo.BaseMutationOptions<DeleteReviewMutation, DeleteReviewMutationVariables>;
export const GetAnnouncementsDocument = gql`
    query GetAnnouncements {
  getAnnouncements {
    id
    title {
      th
      en
    }
    content {
      th
      en
    }
    updatedAt
    status
  }
}
    `;

/**
 * __useGetAnnouncementsQuery__
 *
 * To run a query within a React component, call `useGetAnnouncementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnnouncementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnnouncementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAnnouncementsQuery(baseOptions?: Apollo.QueryHookOptions<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>(GetAnnouncementsDocument, options);
      }
export function useGetAnnouncementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>(GetAnnouncementsDocument, options);
        }
export type GetAnnouncementsQueryHookResult = ReturnType<typeof useGetAnnouncementsQuery>;
export type GetAnnouncementsLazyQueryHookResult = ReturnType<typeof useGetAnnouncementsLazyQuery>;
export type GetAnnouncementsQueryResult = Apollo.QueryResult<GetAnnouncementsQuery, GetAnnouncementsQueryVariables>;
export const GetAnnouncementsAllDocument = gql`
    query GetAnnouncementsAll {
  getAnnouncements {
    id
    title {
      th
      en
    }
    content {
      th
      en
    }
    place {
      id
      name {
        en
        th
      }
    }
    location {
      lat
      lng
    }
    tags
    metadata {
      line
      email
      phone
    }
    status
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useGetAnnouncementsAllQuery__
 *
 * To run a query within a React component, call `useGetAnnouncementsAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnnouncementsAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnnouncementsAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAnnouncementsAllQuery(baseOptions?: Apollo.QueryHookOptions<GetAnnouncementsAllQuery, GetAnnouncementsAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAnnouncementsAllQuery, GetAnnouncementsAllQueryVariables>(GetAnnouncementsAllDocument, options);
      }
export function useGetAnnouncementsAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnnouncementsAllQuery, GetAnnouncementsAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAnnouncementsAllQuery, GetAnnouncementsAllQueryVariables>(GetAnnouncementsAllDocument, options);
        }
export type GetAnnouncementsAllQueryHookResult = ReturnType<typeof useGetAnnouncementsAllQuery>;
export type GetAnnouncementsAllLazyQueryHookResult = ReturnType<typeof useGetAnnouncementsAllLazyQuery>;
export type GetAnnouncementsAllQueryResult = Apollo.QueryResult<GetAnnouncementsAllQuery, GetAnnouncementsAllQueryVariables>;
export const GetAnnouncementByIdDocument = gql`
    query GetAnnouncementById($id: String!) {
  getAnnouncementById(id: $id) {
    id
    title {
      th
      en
    }
    content {
      th
      en
    }
    place {
      id
    }
    location {
      lat
      lng
    }
    images {
      id
      filename
      mimetype
      filesize
      width
      height
      url
      createdAt
      updatedAt
    }
    tags
    metadata {
      line
      email
      phone
    }
    status
    updatedAt
    createdAt
  }
}
    `;

/**
 * __useGetAnnouncementByIdQuery__
 *
 * To run a query within a React component, call `useGetAnnouncementByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAnnouncementByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAnnouncementByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAnnouncementByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAnnouncementByIdQuery, GetAnnouncementByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAnnouncementByIdQuery, GetAnnouncementByIdQueryVariables>(GetAnnouncementByIdDocument, options);
      }
export function useGetAnnouncementByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAnnouncementByIdQuery, GetAnnouncementByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAnnouncementByIdQuery, GetAnnouncementByIdQueryVariables>(GetAnnouncementByIdDocument, options);
        }
export type GetAnnouncementByIdQueryHookResult = ReturnType<typeof useGetAnnouncementByIdQuery>;
export type GetAnnouncementByIdLazyQueryHookResult = ReturnType<typeof useGetAnnouncementByIdLazyQuery>;
export type GetAnnouncementByIdQueryResult = Apollo.QueryResult<GetAnnouncementByIdQuery, GetAnnouncementByIdQueryVariables>;
export const GetFacilitiesByPlaceIdDocument = gql`
    query getFacilitiesByPlaceId($placeId: String!) {
  getFacilitiesByPlaceId(placeId: $placeId) {
    id
    type
    parent {
      id
    }
    detail {
      th
      en
    }
    location {
      lat
      lng
    }
    concern
    metadata {
      length
      rise
    }
    status
    createdAt
    updatedAt
    isWarning
  }
}
    `;

/**
 * __useGetFacilitiesByPlaceIdQuery__
 *
 * To run a query within a React component, call `useGetFacilitiesByPlaceIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFacilitiesByPlaceIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFacilitiesByPlaceIdQuery({
 *   variables: {
 *      placeId: // value for 'placeId'
 *   },
 * });
 */
export function useGetFacilitiesByPlaceIdQuery(baseOptions: Apollo.QueryHookOptions<GetFacilitiesByPlaceIdQuery, GetFacilitiesByPlaceIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFacilitiesByPlaceIdQuery, GetFacilitiesByPlaceIdQueryVariables>(GetFacilitiesByPlaceIdDocument, options);
      }
export function useGetFacilitiesByPlaceIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFacilitiesByPlaceIdQuery, GetFacilitiesByPlaceIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFacilitiesByPlaceIdQuery, GetFacilitiesByPlaceIdQueryVariables>(GetFacilitiesByPlaceIdDocument, options);
        }
export type GetFacilitiesByPlaceIdQueryHookResult = ReturnType<typeof useGetFacilitiesByPlaceIdQuery>;
export type GetFacilitiesByPlaceIdLazyQueryHookResult = ReturnType<typeof useGetFacilitiesByPlaceIdLazyQuery>;
export type GetFacilitiesByPlaceIdQueryResult = Apollo.QueryResult<GetFacilitiesByPlaceIdQuery, GetFacilitiesByPlaceIdQueryVariables>;
export const GetFacilityByIdDocument = gql`
    query getFacilityById($id: String!) {
  getFacilityById(id: $id) {
    id
    type
    parent {
      id
    }
    detail {
      th
      en
    }
    location {
      lat
      lng
    }
    concern
    metadata {
      length
      rise
    }
    status
    createdAt
    updatedAt
    isWarning
  }
}
    `;

/**
 * __useGetFacilityByIdQuery__
 *
 * To run a query within a React component, call `useGetFacilityByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFacilityByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFacilityByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFacilityByIdQuery(baseOptions: Apollo.QueryHookOptions<GetFacilityByIdQuery, GetFacilityByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFacilityByIdQuery, GetFacilityByIdQueryVariables>(GetFacilityByIdDocument, options);
      }
export function useGetFacilityByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFacilityByIdQuery, GetFacilityByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFacilityByIdQuery, GetFacilityByIdQueryVariables>(GetFacilityByIdDocument, options);
        }
export type GetFacilityByIdQueryHookResult = ReturnType<typeof useGetFacilityByIdQuery>;
export type GetFacilityByIdLazyQueryHookResult = ReturnType<typeof useGetFacilityByIdLazyQuery>;
export type GetFacilityByIdQueryResult = Apollo.QueryResult<GetFacilityByIdQuery, GetFacilityByIdQueryVariables>;
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  me {
    id
    firstname
    lastname
    username
    role
  }
}
    `;

/**
 * __useGetMyProfileQuery__
 *
 * To run a query within a React component, call `useGetMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
      }
export function useGetMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(GetMyProfileDocument, options);
        }
export type GetMyProfileQueryHookResult = ReturnType<typeof useGetMyProfileQuery>;
export type GetMyProfileLazyQueryHookResult = ReturnType<typeof useGetMyProfileLazyQuery>;
export type GetMyProfileQueryResult = Apollo.QueryResult<GetMyProfileQuery, GetMyProfileQueryVariables>;
export const GetPlacesDocument = gql`
    query GetPlaces {
  getPlaces {
    id
    type
    name {
      en
      th
    }
    location {
      lat
      lng
    }
    internalCode
    status
    updatedAt
  }
}
    `;

/**
 * __useGetPlacesQuery__
 *
 * To run a query within a React component, call `useGetPlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlacesQuery(baseOptions?: Apollo.QueryHookOptions<GetPlacesQuery, GetPlacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlacesQuery, GetPlacesQueryVariables>(GetPlacesDocument, options);
      }
export function useGetPlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlacesQuery, GetPlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlacesQuery, GetPlacesQueryVariables>(GetPlacesDocument, options);
        }
export type GetPlacesQueryHookResult = ReturnType<typeof useGetPlacesQuery>;
export type GetPlacesLazyQueryHookResult = ReturnType<typeof useGetPlacesLazyQuery>;
export type GetPlacesQueryResult = Apollo.QueryResult<GetPlacesQuery, GetPlacesQueryVariables>;
export const GetPlacesAllDocument = gql`
    query GetPlacesAll {
  getPlaces {
    id
    type
    name {
      en
      th
    }
    address {
      th
      en
    }
    location {
      lat
      lng
    }
    images {
      url
    }
    internalCode
    metadata {
      website
      phone
      busLines
      tramLines
      accessibility
    }
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPlacesAllQuery__
 *
 * To run a query within a React component, call `useGetPlacesAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlacesAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlacesAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlacesAllQuery(baseOptions?: Apollo.QueryHookOptions<GetPlacesAllQuery, GetPlacesAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlacesAllQuery, GetPlacesAllQueryVariables>(GetPlacesAllDocument, options);
      }
export function useGetPlacesAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlacesAllQuery, GetPlacesAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlacesAllQuery, GetPlacesAllQueryVariables>(GetPlacesAllDocument, options);
        }
export type GetPlacesAllQueryHookResult = ReturnType<typeof useGetPlacesAllQuery>;
export type GetPlacesAllLazyQueryHookResult = ReturnType<typeof useGetPlacesAllLazyQuery>;
export type GetPlacesAllQueryResult = Apollo.QueryResult<GetPlacesAllQuery, GetPlacesAllQueryVariables>;
export const GetPlaceByIdDocument = gql`
    query GetPlaceById($id: String!) {
  getPlaceById(id: $id) {
    id
    type
    name {
      th
      en
    }
    address {
      th
      en
    }
    location {
      lat
      lng
    }
    images {
      id
      filename
      mimetype
      filesize
      width
      height
      url
      createdAt
      updatedAt
    }
    internalCode
    metadata {
      website
      phone
      busLines
      tramLines
      accessibility
    }
    status
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetPlaceByIdQuery__
 *
 * To run a query within a React component, call `useGetPlaceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaceByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlaceByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPlaceByIdQuery, GetPlaceByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaceByIdQuery, GetPlaceByIdQueryVariables>(GetPlaceByIdDocument, options);
      }
export function useGetPlaceByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaceByIdQuery, GetPlaceByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaceByIdQuery, GetPlaceByIdQueryVariables>(GetPlaceByIdDocument, options);
        }
export type GetPlaceByIdQueryHookResult = ReturnType<typeof useGetPlaceByIdQuery>;
export type GetPlaceByIdLazyQueryHookResult = ReturnType<typeof useGetPlaceByIdLazyQuery>;
export type GetPlaceByIdQueryResult = Apollo.QueryResult<GetPlaceByIdQuery, GetPlaceByIdQueryVariables>;
export const GetPlaceNameByIdDocument = gql`
    query GetPlaceNameById($id: String!) {
  getPlaceById(id: $id) {
    id
    name {
      th
      en
    }
    internalCode
  }
}
    `;

/**
 * __useGetPlaceNameByIdQuery__
 *
 * To run a query within a React component, call `useGetPlaceNameByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlaceNameByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlaceNameByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPlaceNameByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPlaceNameByIdQuery, GetPlaceNameByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlaceNameByIdQuery, GetPlaceNameByIdQueryVariables>(GetPlaceNameByIdDocument, options);
      }
export function useGetPlaceNameByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlaceNameByIdQuery, GetPlaceNameByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlaceNameByIdQuery, GetPlaceNameByIdQueryVariables>(GetPlaceNameByIdDocument, options);
        }
export type GetPlaceNameByIdQueryHookResult = ReturnType<typeof useGetPlaceNameByIdQuery>;
export type GetPlaceNameByIdLazyQueryHookResult = ReturnType<typeof useGetPlaceNameByIdLazyQuery>;
export type GetPlaceNameByIdQueryResult = Apollo.QueryResult<GetPlaceNameByIdQuery, GetPlaceNameByIdQueryVariables>;
export const GetReviewsDocument = gql`
    query GetReviews {
  getReviews {
    id
    place {
      id
      name {
        en
        th
      }
      internalCode
    }
    user {
      username
      firstname
      lastname
    }
    comment
    updatedAt
    rating {
      overall
    }
    official {
      isFlagged
    }
  }
}
    `;

/**
 * __useGetReviewsQuery__
 *
 * To run a query within a React component, call `useGetReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReviewsQuery(baseOptions?: Apollo.QueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
      }
export function useGetReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsQuery, GetReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsQuery, GetReviewsQueryVariables>(GetReviewsDocument, options);
        }
export type GetReviewsQueryHookResult = ReturnType<typeof useGetReviewsQuery>;
export type GetReviewsLazyQueryHookResult = ReturnType<typeof useGetReviewsLazyQuery>;
export type GetReviewsQueryResult = Apollo.QueryResult<GetReviewsQuery, GetReviewsQueryVariables>;
export const GetReviewsAllDocument = gql`
    query GetReviewsAll {
  getReviews {
    id
    place {
      id
      name {
        en
        th
      }
    }
    user {
      username
      firstname
      lastname
    }
    rating {
      overall
      ramp
      assistance
      elevator
      parking
      surface
      toilet
    }
    comment
    images {
      url
    }
    tags
    official {
      isFlagged
      comment
      timestamp
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetReviewsAllQuery__
 *
 * To run a query within a React component, call `useGetReviewsAllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsAllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsAllQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReviewsAllQuery(baseOptions?: Apollo.QueryHookOptions<GetReviewsAllQuery, GetReviewsAllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsAllQuery, GetReviewsAllQueryVariables>(GetReviewsAllDocument, options);
      }
export function useGetReviewsAllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsAllQuery, GetReviewsAllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsAllQuery, GetReviewsAllQueryVariables>(GetReviewsAllDocument, options);
        }
export type GetReviewsAllQueryHookResult = ReturnType<typeof useGetReviewsAllQuery>;
export type GetReviewsAllLazyQueryHookResult = ReturnType<typeof useGetReviewsAllLazyQuery>;
export type GetReviewsAllQueryResult = Apollo.QueryResult<GetReviewsAllQuery, GetReviewsAllQueryVariables>;
export const GetReviewByIdDocument = gql`
    query getReviewById($id: ID!) {
  getReviewById(id: $id) {
    id
    place {
      id
      name {
        en
        th
      }
      internalCode
      type
    }
    user {
      username
      firstname
      lastname
    }
    rating {
      overall
      ramp
      assistance
      elevator
      parking
      surface
      toilet
    }
    comment
    images {
      id
      filename
      mimetype
      filesize
      width
      height
      url
      createdAt
      updatedAt
    }
    tags
    official {
      isFlagged
      comment
      timestamp
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetReviewByIdQuery__
 *
 * To run a query within a React component, call `useGetReviewByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetReviewByIdQuery(baseOptions: Apollo.QueryHookOptions<GetReviewByIdQuery, GetReviewByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewByIdQuery, GetReviewByIdQueryVariables>(GetReviewByIdDocument, options);
      }
export function useGetReviewByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewByIdQuery, GetReviewByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewByIdQuery, GetReviewByIdQueryVariables>(GetReviewByIdDocument, options);
        }
export type GetReviewByIdQueryHookResult = ReturnType<typeof useGetReviewByIdQuery>;
export type GetReviewByIdLazyQueryHookResult = ReturnType<typeof useGetReviewByIdLazyQuery>;
export type GetReviewByIdQueryResult = Apollo.QueryResult<GetReviewByIdQuery, GetReviewByIdQueryVariables>;
export const GetAllRoutesDocument = gql`
    query GetAllRoutes {
  getRoutes {
    id
  }
}
    `;

/**
 * __useGetAllRoutesQuery__
 *
 * To run a query within a React component, call `useGetAllRoutesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllRoutesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllRoutesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllRoutesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllRoutesQuery, GetAllRoutesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllRoutesQuery, GetAllRoutesQueryVariables>(GetAllRoutesDocument, options);
      }
export function useGetAllRoutesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllRoutesQuery, GetAllRoutesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllRoutesQuery, GetAllRoutesQueryVariables>(GetAllRoutesDocument, options);
        }
export type GetAllRoutesQueryHookResult = ReturnType<typeof useGetAllRoutesQuery>;
export type GetAllRoutesLazyQueryHookResult = ReturnType<typeof useGetAllRoutesLazyQuery>;
export type GetAllRoutesQueryResult = Apollo.QueryResult<GetAllRoutesQuery, GetAllRoutesQueryVariables>;
export const GetAllAnnouncementsDocument = gql`
    query GetAllAnnouncements {
  getAnnouncements {
    id
  }
}
    `;

/**
 * __useGetAllAnnouncementsQuery__
 *
 * To run a query within a React component, call `useGetAllAnnouncementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAnnouncementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAnnouncementsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAnnouncementsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAnnouncementsQuery, GetAllAnnouncementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAnnouncementsQuery, GetAllAnnouncementsQueryVariables>(GetAllAnnouncementsDocument, options);
      }
export function useGetAllAnnouncementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAnnouncementsQuery, GetAllAnnouncementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAnnouncementsQuery, GetAllAnnouncementsQueryVariables>(GetAllAnnouncementsDocument, options);
        }
export type GetAllAnnouncementsQueryHookResult = ReturnType<typeof useGetAllAnnouncementsQuery>;
export type GetAllAnnouncementsLazyQueryHookResult = ReturnType<typeof useGetAllAnnouncementsLazyQuery>;
export type GetAllAnnouncementsQueryResult = Apollo.QueryResult<GetAllAnnouncementsQuery, GetAllAnnouncementsQueryVariables>;
export const GetAllPlacesDocument = gql`
    query GetAllPlaces {
  getPlaces {
    id
  }
}
    `;

/**
 * __useGetAllPlacesQuery__
 *
 * To run a query within a React component, call `useGetAllPlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPlacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPlacesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPlacesQuery, GetAllPlacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPlacesQuery, GetAllPlacesQueryVariables>(GetAllPlacesDocument, options);
      }
export function useGetAllPlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPlacesQuery, GetAllPlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPlacesQuery, GetAllPlacesQueryVariables>(GetAllPlacesDocument, options);
        }
export type GetAllPlacesQueryHookResult = ReturnType<typeof useGetAllPlacesQuery>;
export type GetAllPlacesLazyQueryHookResult = ReturnType<typeof useGetAllPlacesLazyQuery>;
export type GetAllPlacesQueryResult = Apollo.QueryResult<GetAllPlacesQuery, GetAllPlacesQueryVariables>;
export const GetAllReviewsDocument = gql`
    query GetAllReviews {
  getReviews {
    id
  }
}
    `;

/**
 * __useGetAllReviewsQuery__
 *
 * To run a query within a React component, call `useGetAllReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllReviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllReviewsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllReviewsQuery, GetAllReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllReviewsQuery, GetAllReviewsQueryVariables>(GetAllReviewsDocument, options);
      }
export function useGetAllReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllReviewsQuery, GetAllReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllReviewsQuery, GetAllReviewsQueryVariables>(GetAllReviewsDocument, options);
        }
export type GetAllReviewsQueryHookResult = ReturnType<typeof useGetAllReviewsQuery>;
export type GetAllReviewsLazyQueryHookResult = ReturnType<typeof useGetAllReviewsLazyQuery>;
export type GetAllReviewsQueryResult = Apollo.QueryResult<GetAllReviewsQuery, GetAllReviewsQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getUsers {
    id
    metadata {
      impairmentLevel
    }
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetRoutePathsDocument = gql`
    query GetRoutePaths {
  getRoutes {
    id
    paths {
      lat
      lng
    }
  }
}
    `;

/**
 * __useGetRoutePathsQuery__
 *
 * To run a query within a React component, call `useGetRoutePathsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoutePathsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoutePathsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRoutePathsQuery(baseOptions?: Apollo.QueryHookOptions<GetRoutePathsQuery, GetRoutePathsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoutePathsQuery, GetRoutePathsQueryVariables>(GetRoutePathsDocument, options);
      }
export function useGetRoutePathsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoutePathsQuery, GetRoutePathsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoutePathsQuery, GetRoutePathsQueryVariables>(GetRoutePathsDocument, options);
        }
export type GetRoutePathsQueryHookResult = ReturnType<typeof useGetRoutePathsQuery>;
export type GetRoutePathsLazyQueryHookResult = ReturnType<typeof useGetRoutePathsLazyQuery>;
export type GetRoutePathsQueryResult = Apollo.QueryResult<GetRoutePathsQuery, GetRoutePathsQueryVariables>;