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

export type LanguageFieldsFragment = { __typename?: 'LanguageObject', th?: string | null, en?: string | null };

export type LocationFieldsFragment = { __typename?: 'Location', lat: number, lng: number };

export type MediaFieldsFragment = { __typename?: 'Media', id: string, url?: string | null, width?: number | null, height?: number | null };

export type PlaceBriefFieldsFragment = { __typename?: 'Place', type?: Place_Types | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, images?: Array<{ __typename?: 'Media', id: string, url?: string | null, width?: number | null, height?: number | null }> | null };

export type RatingFieldsFragment = { __typename?: 'RatingObject', overall?: number | null, ramp?: number | null, assistance?: number | null, elevator?: number | null, toilet?: number | null, parking?: number | null, surface?: number | null };

export type RouteFieldsFragment = { __typename?: 'Route', id: string, type?: Route_Types | null, distance?: number | null, duration?: number | null, createdAt?: any | null, paths?: Array<{ __typename?: 'Location', lat: number, lng: number }> | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refresh: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', accessToken: string, refreshToken: string } };

export type UploadMediaMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadMediaMutation = { __typename?: 'Mutation', uploadMedia: { __typename?: 'Media', id: string, url?: string | null } };

export type CreateReviewMutationVariables = Exact<{
  input: CreateReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', id: string } };

export type CreateRoutesMutationVariables = Exact<{
  input: CreateRouteInput;
}>;


export type CreateRoutesMutation = { __typename?: 'Mutation', createRoute: { __typename?: 'Route', id: string } };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string } };

export type GetAnnouncementsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAnnouncementsQuery = { __typename?: 'Query', getAnnouncements: Array<{ __typename?: 'Announcement', id: string, tags?: Array<string> | null, createdAt?: any | null, title?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, content?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, place?: { __typename?: 'Place', id: string, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null }> };

export type GetAnnouncementByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAnnouncementByIdQuery = { __typename?: 'Query', getAnnouncementById: { __typename?: 'Announcement', id: string, tags?: Array<string> | null, createdAt?: any | null, title?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, content?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, images?: Array<{ __typename?: 'Media', id: string, url?: string | null, width?: number | null, height?: number | null }> | null, metadata?: { __typename?: 'AnnouncementMetadata', phone?: string | null, email?: string | null, line?: string | null } | null, place?: { __typename?: 'Place', id: string, type?: Place_Types | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null } | null } };

export type GetFacilitiesQueryVariables = Exact<{
  options?: GetFacilitiesInput;
}>;


export type GetFacilitiesQuery = { __typename?: 'Query', getFacilities: Array<{ __typename?: 'Facility', id: string, type?: Facility_Types | null, location?: { __typename?: 'Location', lat: number, lng: number } | null }> };

export type GetFacilitiesByPlaceIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetFacilitiesByPlaceIdQuery = { __typename?: 'Query', getFacilitiesByPlaceId: Array<{ __typename?: 'Facility', id: string, type?: Facility_Types | null, detail?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null }> };

export type GetPlacesQueryVariables = Exact<{
  type?: InputMaybe<Array<Place_Types> | Place_Types>;
}>;


export type GetPlacesQuery = { __typename?: 'Query', getPlaces: Array<{ __typename?: 'Place', id: string, type?: Place_Types | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null }> };

export type GetPlaceByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPlaceByIdQuery = { __typename?: 'Query', getPlaceById: { __typename?: 'Place', id: string, type?: Place_Types | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, address?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null, images?: Array<{ __typename?: 'Media', id: string, url?: string | null, width?: number | null, height?: number | null }> | null, metadata?: { __typename?: 'PlaceMetadata', phone?: string | null, website?: string | null, busLines?: Array<string> | null, tramLines?: Array<string> | null, accessibility?: Accessibility_Status | null } | null }, getRatingSummaryByPlaceId: { __typename?: 'RatingSummary', id: string, overall: number, reviewCount: number, tags: Array<{ __typename?: 'RatingTagCount', tag: string, count: number }>, facilities: { __typename?: 'FacilitiesAvailability', RAMP?: { __typename?: 'FacilityAvailability', status: Facility_Status, rating: number } | null, ASSISTANCE?: { __typename?: 'FacilityAvailability', status: Facility_Status, rating: number } | null, TOILET?: { __typename?: 'FacilityAvailability', status: Facility_Status, rating: number } | null, ELEVATOR?: { __typename?: 'FacilityAvailability', status: Facility_Status, rating: number } | null, PARKING?: { __typename?: 'FacilityAvailability', status: Facility_Status, rating: number } | null, SURFACE?: { __typename?: 'FacilityAvailability', status: Facility_Status, rating: number } | null } } };

export type GetNearbyPlacesQueryVariables = Exact<{
  lat: Scalars['String'];
  lng: Scalars['String'];
  radius: Scalars['Float'];
  limit?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Array<Place_Types> | Place_Types>;
  exclude?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetNearbyPlacesQuery = { __typename?: 'Query', getPlaces: Array<{ __typename?: 'Place', id: string, type?: Place_Types | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, location?: { __typename?: 'Location', lat: number, lng: number } | null }> };

export type SearchPlacesQueryVariables = Exact<{
  query: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  type?: InputMaybe<Array<Place_Types> | Place_Types>;
  excludeTypes?: InputMaybe<Array<Place_Types> | Place_Types>;
  exclude?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type SearchPlacesQuery = { __typename?: 'Query', getPlaces: Array<{ __typename?: 'Place', id: string, type?: Place_Types | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null }> };

export type GetRatingSummaryQueryVariables = Exact<{
  placeIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetRatingSummaryQuery = { __typename?: 'Query', getRatingSummaryByPlaceIds: Array<{ __typename?: 'RatingSummary', id: string, overall: number }> };

export type GetMyReviewsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyReviewsQuery = { __typename?: 'Query', getMyReviews: Array<{ __typename?: 'Review', id: string, createdAt?: any | null, place?: { __typename?: 'Place', type?: Place_Types | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, images?: Array<{ __typename?: 'Media', id: string, url?: string | null, width?: number | null, height?: number | null }> | null } | null, rating?: { __typename?: 'RatingObject', overall?: number | null } | null }> };

export type GetReviewByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetReviewByIdQuery = { __typename?: 'Query', getReviewById: { __typename?: 'Review', id: string, comment?: string | null, tags?: Array<string> | null, createdAt?: any | null, place?: { __typename?: 'Place', type?: Place_Types | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, images?: Array<{ __typename?: 'Media', id: string, url?: string | null, width?: number | null, height?: number | null }> | null } | null, rating?: { __typename?: 'RatingObject', overall?: number | null, ramp?: number | null, assistance?: number | null, elevator?: number | null, toilet?: number | null, parking?: number | null, surface?: number | null } | null, images?: Array<{ __typename?: 'Media', id: string, url?: string | null, width?: number | null, height?: number | null }> | null, official?: { __typename?: 'OfficialReviewObject', isFlagged?: boolean | null, comment?: string | null, timestamp?: any | null } | null } };

export type GetReviewsByPlaceIdQueryVariables = Exact<{
  placeId: Scalars['ID'];
}>;


export type GetReviewsByPlaceIdQuery = { __typename?: 'Query', getReviewsByPlaceId: Array<{ __typename?: 'Review', id: string, comment?: string | null, tags?: Array<string> | null, createdAt?: any | null, user?: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null } | null, rating?: { __typename?: 'RatingObject', overall?: number | null, ramp?: number | null, assistance?: number | null, elevator?: number | null, toilet?: number | null, parking?: number | null, surface?: number | null } | null, images?: Array<{ __typename?: 'Media', id: string, url?: string | null, width?: number | null, height?: number | null }> | null, official?: { __typename?: 'OfficialReviewObject', isFlagged?: boolean | null, comment?: string | null, timestamp?: any | null } | null }> };

export type SearchRoutesQueryVariables = Exact<{
  from: Scalars['String'];
  to: Scalars['String'];
}>;


export type SearchRoutesQuery = { __typename?: 'Query', getRoutes: Array<{ __typename?: 'Route', id: string, type?: Route_Types | null, distance?: number | null, duration?: number | null }> };

export type GetPreDefinedRoutesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPreDefinedRoutesQuery = { __typename?: 'Query', getRoutes: Array<{ __typename?: 'Route', id: string, type?: Route_Types | null, distance?: number | null, duration?: number | null, createdAt?: any | null, paths?: Array<{ __typename?: 'Location', lat: number, lng: number }> | null }> };

export type GetMyTracedRoutesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyTracedRoutesQuery = { __typename?: 'Query', getMyTracedRoutes: Array<{ __typename?: 'Route', id: string, type?: Route_Types | null, distance?: number | null, duration?: number | null, createdAt?: any | null, paths?: Array<{ __typename?: 'Location', lat: number, lng: number }> | null }> };

export type GetRouteByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetRouteByIdQuery = { __typename?: 'Query', getRouteById: { __typename?: 'Route', id: string, type?: Route_Types | null, distance?: number | null, duration?: number | null, createdAt?: any | null, paths?: Array<{ __typename?: 'Location', lat: number, lng: number }> | null } };

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstname?: string | null, lastname?: string | null, username?: string | null, role?: Roles | null, email?: string | null, profileImage?: { __typename?: 'Media', id: string, url?: string | null, width?: number | null, height?: number | null } | null, metadata?: { __typename?: 'UserMetadata', impairmentLevel?: string | null, equipment?: string | null } | null } };

export type GetMyFavoritePlacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyFavoritePlacesQuery = { __typename?: 'Query', me: { __typename?: 'User', metadata?: { __typename?: 'UserMetadata', favorites?: Array<{ __typename?: 'FavoritePlace', addedAt?: any | null, place?: { __typename?: 'Place', id: string, type?: Place_Types | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null } | null }> | null } | null } };

export type AddPlaceToFavoritesMutationVariables = Exact<{
  placeId: Scalars['String'];
}>;


export type AddPlaceToFavoritesMutation = { __typename?: 'Mutation', addFavoritePlace: { __typename?: 'User', id: string } };

export type RemovePlaceFromFavoritesMutationVariables = Exact<{
  placeId: Scalars['String'];
}>;


export type RemovePlaceFromFavoritesMutation = { __typename?: 'Mutation', removeFavoritePlace: { __typename?: 'User', id: string } };

export type IsFavoritePlaceQueryVariables = Exact<{
  placeId: Scalars['String'];
}>;


export type IsFavoritePlaceQuery = { __typename?: 'Query', isFavoritePlace: boolean };

export type GetMyProfileSummaryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyProfileSummaryQuery = { __typename?: 'Query', getMySummary: { __typename?: 'UserSummary', distance: number, routes: number, reviews: number, joinedAt?: any | null } };

export type GetMyExpQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyExpQuery = { __typename?: 'Query', getMyExperiencePoint: { __typename?: 'ExperiencePoint', level: number, point: number, nextLevelPoint: number } };

export type GetMyBadgesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBadgesQuery = { __typename?: 'Query', getMyBadges: Array<{ __typename?: 'UserBadge', badge: { __typename?: 'Badge', id: string, color?: string | null, icon?: string | null, name: { __typename?: 'LanguageObject', th?: string | null, en?: string | null }, description: { __typename?: 'LanguageObject', th?: string | null, en?: string | null }, conditions?: Array<{ __typename?: 'BadgeCondition', icon?: string | null, color?: string | null, name?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null, description?: { __typename?: 'LanguageObject', th?: string | null, en?: string | null } | null }> | null } }> };

export const LanguageFieldsFragmentDoc = gql`
    fragment LanguageFields on LanguageObject {
  th
  en
}
    `;
export const MediaFieldsFragmentDoc = gql`
    fragment MediaFields on Media {
  id
  url
  width
  height
}
    `;
export const PlaceBriefFieldsFragmentDoc = gql`
    fragment PlaceBriefFields on Place {
  name {
    ...LanguageFields
  }
  type
  images {
    ...MediaFields
  }
}
    ${LanguageFieldsFragmentDoc}
${MediaFieldsFragmentDoc}`;
export const RatingFieldsFragmentDoc = gql`
    fragment RatingFields on RatingObject {
  overall
  ramp
  assistance
  elevator
  toilet
  parking
  surface
}
    `;
export const LocationFieldsFragmentDoc = gql`
    fragment LocationFields on Location {
  lat
  lng
}
    `;
export const RouteFieldsFragmentDoc = gql`
    fragment RouteFields on Route {
  id
  type
  paths {
    ...LocationFields
  }
  distance
  duration
  createdAt
}
    ${LocationFieldsFragmentDoc}`;
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
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  register(data: $data) {
    accessToken
    refreshToken
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UploadMediaDocument = gql`
    mutation UploadMedia($file: Upload!) {
  uploadMedia(file: $file) {
    id
    url
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
export const CreateReviewDocument = gql`
    mutation CreateReview($input: CreateReviewInput!) {
  createReview(review: $input) {
    id
  }
}
    `;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const CreateRoutesDocument = gql`
    mutation CreateRoutes($input: CreateRouteInput!) {
  createRoute(data: $input) {
    id
  }
}
    `;
export type CreateRoutesMutationFn = Apollo.MutationFunction<CreateRoutesMutation, CreateRoutesMutationVariables>;

/**
 * __useCreateRoutesMutation__
 *
 * To run a mutation, you first call `useCreateRoutesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoutesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoutesMutation, { data, loading, error }] = useCreateRoutesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoutesMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoutesMutation, CreateRoutesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoutesMutation, CreateRoutesMutationVariables>(CreateRoutesDocument, options);
      }
export type CreateRoutesMutationHookResult = ReturnType<typeof useCreateRoutesMutation>;
export type CreateRoutesMutationResult = Apollo.MutationResult<CreateRoutesMutation>;
export type CreateRoutesMutationOptions = Apollo.BaseMutationOptions<CreateRoutesMutation, CreateRoutesMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateUserInput!) {
  updateUser(data: $input) {
    id
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
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
    tags
    place {
      id
      name {
        th
        en
      }
    }
    location {
      lat
      lng
    }
    createdAt
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
    tags
    images {
      id
      url
      width
      height
    }
    metadata {
      phone
      email
      line
    }
    place {
      id
      name {
        th
        en
      }
      type
    }
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
export const GetFacilitiesDocument = gql`
    query GetFacilities($options: GetFacilitiesInput! = {}) {
  getFacilities(options: $options) {
    id
    type
    location {
      lat
      lng
    }
  }
}
    `;

/**
 * __useGetFacilitiesQuery__
 *
 * To run a query within a React component, call `useGetFacilitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFacilitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFacilitiesQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useGetFacilitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetFacilitiesQuery, GetFacilitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFacilitiesQuery, GetFacilitiesQueryVariables>(GetFacilitiesDocument, options);
      }
export function useGetFacilitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFacilitiesQuery, GetFacilitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFacilitiesQuery, GetFacilitiesQueryVariables>(GetFacilitiesDocument, options);
        }
export type GetFacilitiesQueryHookResult = ReturnType<typeof useGetFacilitiesQuery>;
export type GetFacilitiesLazyQueryHookResult = ReturnType<typeof useGetFacilitiesLazyQuery>;
export type GetFacilitiesQueryResult = Apollo.QueryResult<GetFacilitiesQuery, GetFacilitiesQueryVariables>;
export const GetFacilitiesByPlaceIdDocument = gql`
    query GetFacilitiesByPlaceId($id: String!) {
  getFacilitiesByPlaceId(placeId: $id) {
    id
    type
    detail {
      th
      en
    }
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
 *      id: // value for 'id'
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
export const GetPlacesDocument = gql`
    query GetPlaces($type: [PLACE_TYPES!]) {
  getPlaces(options: {types: $type}) {
    id
    name {
      ...LanguageFields
    }
    type
    location {
      ...LocationFields
    }
  }
}
    ${LanguageFieldsFragmentDoc}
${LocationFieldsFragmentDoc}`;

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
 *      type: // value for 'type'
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
export const GetPlaceByIdDocument = gql`
    query GetPlaceById($id: String!) {
  getPlaceById(id: $id) {
    id
    name {
      ...LanguageFields
    }
    type
    address {
      ...LanguageFields
    }
    location {
      ...LocationFields
    }
    images {
      ...MediaFields
    }
    metadata {
      phone
      website
      busLines
      tramLines
      accessibility
    }
  }
  getRatingSummaryByPlaceId(id: $id) {
    id
    overall
    reviewCount
    tags {
      tag
      count
    }
    facilities {
      RAMP {
        status
        rating
      }
      ASSISTANCE {
        status
        rating
      }
      TOILET {
        status
        rating
      }
      ELEVATOR {
        status
        rating
      }
      PARKING {
        status
        rating
      }
      SURFACE {
        status
        rating
      }
    }
  }
}
    ${LanguageFieldsFragmentDoc}
${LocationFieldsFragmentDoc}
${MediaFieldsFragmentDoc}`;

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
export const GetNearbyPlacesDocument = gql`
    query GetNearbyPlaces($lat: String!, $lng: String!, $radius: Float!, $limit: Float = 100, $type: [PLACE_TYPES!], $exclude: [String!]) {
  getPlaces(
    options: {location: {lat: $lat, lng: $lng}, radius: $radius, limit: $limit, types: $type, exclude: $exclude}
  ) {
    id
    name {
      ...LanguageFields
    }
    type
    location {
      ...LocationFields
    }
  }
}
    ${LanguageFieldsFragmentDoc}
${LocationFieldsFragmentDoc}`;

/**
 * __useGetNearbyPlacesQuery__
 *
 * To run a query within a React component, call `useGetNearbyPlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNearbyPlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNearbyPlacesQuery({
 *   variables: {
 *      lat: // value for 'lat'
 *      lng: // value for 'lng'
 *      radius: // value for 'radius'
 *      limit: // value for 'limit'
 *      type: // value for 'type'
 *      exclude: // value for 'exclude'
 *   },
 * });
 */
export function useGetNearbyPlacesQuery(baseOptions: Apollo.QueryHookOptions<GetNearbyPlacesQuery, GetNearbyPlacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNearbyPlacesQuery, GetNearbyPlacesQueryVariables>(GetNearbyPlacesDocument, options);
      }
export function useGetNearbyPlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNearbyPlacesQuery, GetNearbyPlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNearbyPlacesQuery, GetNearbyPlacesQueryVariables>(GetNearbyPlacesDocument, options);
        }
export type GetNearbyPlacesQueryHookResult = ReturnType<typeof useGetNearbyPlacesQuery>;
export type GetNearbyPlacesLazyQueryHookResult = ReturnType<typeof useGetNearbyPlacesLazyQuery>;
export type GetNearbyPlacesQueryResult = Apollo.QueryResult<GetNearbyPlacesQuery, GetNearbyPlacesQueryVariables>;
export const SearchPlacesDocument = gql`
    query SearchPlaces($query: String!, $limit: Float = 100, $type: [PLACE_TYPES!], $excludeTypes: [PLACE_TYPES!], $exclude: [String!]) {
  getPlaces(
    options: {keyword: $query, limit: $limit, types: $type, exclude: $exclude, excludeTypes: $excludeTypes}
  ) {
    id
    name {
      ...LanguageFields
    }
    type
  }
}
    ${LanguageFieldsFragmentDoc}`;

/**
 * __useSearchPlacesQuery__
 *
 * To run a query within a React component, call `useSearchPlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPlacesQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *      type: // value for 'type'
 *      excludeTypes: // value for 'excludeTypes'
 *      exclude: // value for 'exclude'
 *   },
 * });
 */
export function useSearchPlacesQuery(baseOptions: Apollo.QueryHookOptions<SearchPlacesQuery, SearchPlacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPlacesQuery, SearchPlacesQueryVariables>(SearchPlacesDocument, options);
      }
export function useSearchPlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPlacesQuery, SearchPlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPlacesQuery, SearchPlacesQueryVariables>(SearchPlacesDocument, options);
        }
export type SearchPlacesQueryHookResult = ReturnType<typeof useSearchPlacesQuery>;
export type SearchPlacesLazyQueryHookResult = ReturnType<typeof useSearchPlacesLazyQuery>;
export type SearchPlacesQueryResult = Apollo.QueryResult<SearchPlacesQuery, SearchPlacesQueryVariables>;
export const GetRatingSummaryDocument = gql`
    query GetRatingSummary($placeIds: [String!]!) {
  getRatingSummaryByPlaceIds(ids: $placeIds) {
    id
    overall
  }
}
    `;

/**
 * __useGetRatingSummaryQuery__
 *
 * To run a query within a React component, call `useGetRatingSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRatingSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRatingSummaryQuery({
 *   variables: {
 *      placeIds: // value for 'placeIds'
 *   },
 * });
 */
export function useGetRatingSummaryQuery(baseOptions: Apollo.QueryHookOptions<GetRatingSummaryQuery, GetRatingSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRatingSummaryQuery, GetRatingSummaryQueryVariables>(GetRatingSummaryDocument, options);
      }
export function useGetRatingSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRatingSummaryQuery, GetRatingSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRatingSummaryQuery, GetRatingSummaryQueryVariables>(GetRatingSummaryDocument, options);
        }
export type GetRatingSummaryQueryHookResult = ReturnType<typeof useGetRatingSummaryQuery>;
export type GetRatingSummaryLazyQueryHookResult = ReturnType<typeof useGetRatingSummaryLazyQuery>;
export type GetRatingSummaryQueryResult = Apollo.QueryResult<GetRatingSummaryQuery, GetRatingSummaryQueryVariables>;
export const GetMyReviewsDocument = gql`
    query GetMyReviews {
  getMyReviews {
    id
    place {
      ...PlaceBriefFields
    }
    rating {
      overall
    }
    createdAt
  }
}
    ${PlaceBriefFieldsFragmentDoc}`;

/**
 * __useGetMyReviewsQuery__
 *
 * To run a query within a React component, call `useGetMyReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyReviewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyReviewsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyReviewsQuery, GetMyReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyReviewsQuery, GetMyReviewsQueryVariables>(GetMyReviewsDocument, options);
      }
export function useGetMyReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyReviewsQuery, GetMyReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyReviewsQuery, GetMyReviewsQueryVariables>(GetMyReviewsDocument, options);
        }
export type GetMyReviewsQueryHookResult = ReturnType<typeof useGetMyReviewsQuery>;
export type GetMyReviewsLazyQueryHookResult = ReturnType<typeof useGetMyReviewsLazyQuery>;
export type GetMyReviewsQueryResult = Apollo.QueryResult<GetMyReviewsQuery, GetMyReviewsQueryVariables>;
export const GetReviewByIdDocument = gql`
    query GetReviewById($id: ID!) {
  getReviewById(id: $id) {
    id
    place {
      ...PlaceBriefFields
    }
    rating {
      ...RatingFields
    }
    comment
    images {
      ...MediaFields
    }
    tags
    official {
      isFlagged
      comment
      timestamp
    }
    createdAt
  }
}
    ${PlaceBriefFieldsFragmentDoc}
${RatingFieldsFragmentDoc}
${MediaFieldsFragmentDoc}`;

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
export const GetReviewsByPlaceIdDocument = gql`
    query GetReviewsByPlaceId($placeId: ID!) {
  getReviewsByPlaceId(placeId: $placeId) {
    id
    user {
      id
      firstname
      lastname
    }
    rating {
      ...RatingFields
    }
    comment
    images {
      ...MediaFields
    }
    tags
    official {
      isFlagged
      comment
      timestamp
    }
    createdAt
  }
}
    ${RatingFieldsFragmentDoc}
${MediaFieldsFragmentDoc}`;

/**
 * __useGetReviewsByPlaceIdQuery__
 *
 * To run a query within a React component, call `useGetReviewsByPlaceIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsByPlaceIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsByPlaceIdQuery({
 *   variables: {
 *      placeId: // value for 'placeId'
 *   },
 * });
 */
export function useGetReviewsByPlaceIdQuery(baseOptions: Apollo.QueryHookOptions<GetReviewsByPlaceIdQuery, GetReviewsByPlaceIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsByPlaceIdQuery, GetReviewsByPlaceIdQueryVariables>(GetReviewsByPlaceIdDocument, options);
      }
export function useGetReviewsByPlaceIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsByPlaceIdQuery, GetReviewsByPlaceIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsByPlaceIdQuery, GetReviewsByPlaceIdQueryVariables>(GetReviewsByPlaceIdDocument, options);
        }
export type GetReviewsByPlaceIdQueryHookResult = ReturnType<typeof useGetReviewsByPlaceIdQuery>;
export type GetReviewsByPlaceIdLazyQueryHookResult = ReturnType<typeof useGetReviewsByPlaceIdLazyQuery>;
export type GetReviewsByPlaceIdQueryResult = Apollo.QueryResult<GetReviewsByPlaceIdQuery, GetReviewsByPlaceIdQueryVariables>;
export const SearchRoutesDocument = gql`
    query SearchRoutes($from: String!, $to: String!) {
  getRoutes(options: {origin: $from, destination: $to}) {
    id
    type
    distance
    duration
  }
}
    `;

/**
 * __useSearchRoutesQuery__
 *
 * To run a query within a React component, call `useSearchRoutesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRoutesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRoutesQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useSearchRoutesQuery(baseOptions: Apollo.QueryHookOptions<SearchRoutesQuery, SearchRoutesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRoutesQuery, SearchRoutesQueryVariables>(SearchRoutesDocument, options);
      }
export function useSearchRoutesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRoutesQuery, SearchRoutesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRoutesQuery, SearchRoutesQueryVariables>(SearchRoutesDocument, options);
        }
export type SearchRoutesQueryHookResult = ReturnType<typeof useSearchRoutesQuery>;
export type SearchRoutesLazyQueryHookResult = ReturnType<typeof useSearchRoutesLazyQuery>;
export type SearchRoutesQueryResult = Apollo.QueryResult<SearchRoutesQuery, SearchRoutesQueryVariables>;
export const GetPreDefinedRoutesDocument = gql`
    query GetPreDefinedRoutes {
  getRoutes {
    ...RouteFields
  }
}
    ${RouteFieldsFragmentDoc}`;

/**
 * __useGetPreDefinedRoutesQuery__
 *
 * To run a query within a React component, call `useGetPreDefinedRoutesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPreDefinedRoutesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPreDefinedRoutesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPreDefinedRoutesQuery(baseOptions?: Apollo.QueryHookOptions<GetPreDefinedRoutesQuery, GetPreDefinedRoutesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPreDefinedRoutesQuery, GetPreDefinedRoutesQueryVariables>(GetPreDefinedRoutesDocument, options);
      }
export function useGetPreDefinedRoutesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPreDefinedRoutesQuery, GetPreDefinedRoutesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPreDefinedRoutesQuery, GetPreDefinedRoutesQueryVariables>(GetPreDefinedRoutesDocument, options);
        }
export type GetPreDefinedRoutesQueryHookResult = ReturnType<typeof useGetPreDefinedRoutesQuery>;
export type GetPreDefinedRoutesLazyQueryHookResult = ReturnType<typeof useGetPreDefinedRoutesLazyQuery>;
export type GetPreDefinedRoutesQueryResult = Apollo.QueryResult<GetPreDefinedRoutesQuery, GetPreDefinedRoutesQueryVariables>;
export const GetMyTracedRoutesDocument = gql`
    query GetMyTracedRoutes {
  getMyTracedRoutes {
    ...RouteFields
  }
}
    ${RouteFieldsFragmentDoc}`;

/**
 * __useGetMyTracedRoutesQuery__
 *
 * To run a query within a React component, call `useGetMyTracedRoutesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTracedRoutesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTracedRoutesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyTracedRoutesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTracedRoutesQuery, GetMyTracedRoutesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTracedRoutesQuery, GetMyTracedRoutesQueryVariables>(GetMyTracedRoutesDocument, options);
      }
export function useGetMyTracedRoutesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTracedRoutesQuery, GetMyTracedRoutesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTracedRoutesQuery, GetMyTracedRoutesQueryVariables>(GetMyTracedRoutesDocument, options);
        }
export type GetMyTracedRoutesQueryHookResult = ReturnType<typeof useGetMyTracedRoutesQuery>;
export type GetMyTracedRoutesLazyQueryHookResult = ReturnType<typeof useGetMyTracedRoutesLazyQuery>;
export type GetMyTracedRoutesQueryResult = Apollo.QueryResult<GetMyTracedRoutesQuery, GetMyTracedRoutesQueryVariables>;
export const GetRouteByIdDocument = gql`
    query GetRouteById($id: String!) {
  getRouteById(id: $id) {
    ...RouteFields
  }
}
    ${RouteFieldsFragmentDoc}`;

/**
 * __useGetRouteByIdQuery__
 *
 * To run a query within a React component, call `useGetRouteByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRouteByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRouteByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRouteByIdQuery(baseOptions: Apollo.QueryHookOptions<GetRouteByIdQuery, GetRouteByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRouteByIdQuery, GetRouteByIdQueryVariables>(GetRouteByIdDocument, options);
      }
export function useGetRouteByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRouteByIdQuery, GetRouteByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRouteByIdQuery, GetRouteByIdQueryVariables>(GetRouteByIdDocument, options);
        }
export type GetRouteByIdQueryHookResult = ReturnType<typeof useGetRouteByIdQuery>;
export type GetRouteByIdLazyQueryHookResult = ReturnType<typeof useGetRouteByIdLazyQuery>;
export type GetRouteByIdQueryResult = Apollo.QueryResult<GetRouteByIdQuery, GetRouteByIdQueryVariables>;
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  me {
    id
    firstname
    lastname
    username
    role
    email
    profileImage {
      ...MediaFields
    }
    metadata {
      impairmentLevel
      equipment
    }
  }
}
    ${MediaFieldsFragmentDoc}`;

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
export const GetMyFavoritePlacesDocument = gql`
    query GetMyFavoritePlaces {
  me {
    metadata {
      favorites {
        addedAt
        place {
          id
          name {
            th
            en
          }
          type
        }
      }
    }
  }
}
    `;

/**
 * __useGetMyFavoritePlacesQuery__
 *
 * To run a query within a React component, call `useGetMyFavoritePlacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyFavoritePlacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyFavoritePlacesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyFavoritePlacesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyFavoritePlacesQuery, GetMyFavoritePlacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyFavoritePlacesQuery, GetMyFavoritePlacesQueryVariables>(GetMyFavoritePlacesDocument, options);
      }
export function useGetMyFavoritePlacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyFavoritePlacesQuery, GetMyFavoritePlacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyFavoritePlacesQuery, GetMyFavoritePlacesQueryVariables>(GetMyFavoritePlacesDocument, options);
        }
export type GetMyFavoritePlacesQueryHookResult = ReturnType<typeof useGetMyFavoritePlacesQuery>;
export type GetMyFavoritePlacesLazyQueryHookResult = ReturnType<typeof useGetMyFavoritePlacesLazyQuery>;
export type GetMyFavoritePlacesQueryResult = Apollo.QueryResult<GetMyFavoritePlacesQuery, GetMyFavoritePlacesQueryVariables>;
export const AddPlaceToFavoritesDocument = gql`
    mutation AddPlaceToFavorites($placeId: String!) {
  addFavoritePlace(placeId: $placeId) {
    id
  }
}
    `;
export type AddPlaceToFavoritesMutationFn = Apollo.MutationFunction<AddPlaceToFavoritesMutation, AddPlaceToFavoritesMutationVariables>;

/**
 * __useAddPlaceToFavoritesMutation__
 *
 * To run a mutation, you first call `useAddPlaceToFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPlaceToFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPlaceToFavoritesMutation, { data, loading, error }] = useAddPlaceToFavoritesMutation({
 *   variables: {
 *      placeId: // value for 'placeId'
 *   },
 * });
 */
export function useAddPlaceToFavoritesMutation(baseOptions?: Apollo.MutationHookOptions<AddPlaceToFavoritesMutation, AddPlaceToFavoritesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPlaceToFavoritesMutation, AddPlaceToFavoritesMutationVariables>(AddPlaceToFavoritesDocument, options);
      }
export type AddPlaceToFavoritesMutationHookResult = ReturnType<typeof useAddPlaceToFavoritesMutation>;
export type AddPlaceToFavoritesMutationResult = Apollo.MutationResult<AddPlaceToFavoritesMutation>;
export type AddPlaceToFavoritesMutationOptions = Apollo.BaseMutationOptions<AddPlaceToFavoritesMutation, AddPlaceToFavoritesMutationVariables>;
export const RemovePlaceFromFavoritesDocument = gql`
    mutation RemovePlaceFromFavorites($placeId: String!) {
  removeFavoritePlace(placeId: $placeId) {
    id
  }
}
    `;
export type RemovePlaceFromFavoritesMutationFn = Apollo.MutationFunction<RemovePlaceFromFavoritesMutation, RemovePlaceFromFavoritesMutationVariables>;

/**
 * __useRemovePlaceFromFavoritesMutation__
 *
 * To run a mutation, you first call `useRemovePlaceFromFavoritesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePlaceFromFavoritesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePlaceFromFavoritesMutation, { data, loading, error }] = useRemovePlaceFromFavoritesMutation({
 *   variables: {
 *      placeId: // value for 'placeId'
 *   },
 * });
 */
export function useRemovePlaceFromFavoritesMutation(baseOptions?: Apollo.MutationHookOptions<RemovePlaceFromFavoritesMutation, RemovePlaceFromFavoritesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePlaceFromFavoritesMutation, RemovePlaceFromFavoritesMutationVariables>(RemovePlaceFromFavoritesDocument, options);
      }
export type RemovePlaceFromFavoritesMutationHookResult = ReturnType<typeof useRemovePlaceFromFavoritesMutation>;
export type RemovePlaceFromFavoritesMutationResult = Apollo.MutationResult<RemovePlaceFromFavoritesMutation>;
export type RemovePlaceFromFavoritesMutationOptions = Apollo.BaseMutationOptions<RemovePlaceFromFavoritesMutation, RemovePlaceFromFavoritesMutationVariables>;
export const IsFavoritePlaceDocument = gql`
    query IsFavoritePlace($placeId: String!) {
  isFavoritePlace(placeId: $placeId)
}
    `;

/**
 * __useIsFavoritePlaceQuery__
 *
 * To run a query within a React component, call `useIsFavoritePlaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsFavoritePlaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsFavoritePlaceQuery({
 *   variables: {
 *      placeId: // value for 'placeId'
 *   },
 * });
 */
export function useIsFavoritePlaceQuery(baseOptions: Apollo.QueryHookOptions<IsFavoritePlaceQuery, IsFavoritePlaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsFavoritePlaceQuery, IsFavoritePlaceQueryVariables>(IsFavoritePlaceDocument, options);
      }
export function useIsFavoritePlaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsFavoritePlaceQuery, IsFavoritePlaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsFavoritePlaceQuery, IsFavoritePlaceQueryVariables>(IsFavoritePlaceDocument, options);
        }
export type IsFavoritePlaceQueryHookResult = ReturnType<typeof useIsFavoritePlaceQuery>;
export type IsFavoritePlaceLazyQueryHookResult = ReturnType<typeof useIsFavoritePlaceLazyQuery>;
export type IsFavoritePlaceQueryResult = Apollo.QueryResult<IsFavoritePlaceQuery, IsFavoritePlaceQueryVariables>;
export const GetMyProfileSummaryDocument = gql`
    query GetMyProfileSummary {
  getMySummary {
    distance
    routes
    reviews
    joinedAt
  }
}
    `;

/**
 * __useGetMyProfileSummaryQuery__
 *
 * To run a query within a React component, call `useGetMyProfileSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileSummaryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileSummaryQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProfileSummaryQuery, GetMyProfileSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProfileSummaryQuery, GetMyProfileSummaryQueryVariables>(GetMyProfileSummaryDocument, options);
      }
export function useGetMyProfileSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProfileSummaryQuery, GetMyProfileSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProfileSummaryQuery, GetMyProfileSummaryQueryVariables>(GetMyProfileSummaryDocument, options);
        }
export type GetMyProfileSummaryQueryHookResult = ReturnType<typeof useGetMyProfileSummaryQuery>;
export type GetMyProfileSummaryLazyQueryHookResult = ReturnType<typeof useGetMyProfileSummaryLazyQuery>;
export type GetMyProfileSummaryQueryResult = Apollo.QueryResult<GetMyProfileSummaryQuery, GetMyProfileSummaryQueryVariables>;
export const GetMyExpDocument = gql`
    query GetMyExp {
  getMyExperiencePoint {
    level
    point
    nextLevelPoint
  }
}
    `;

/**
 * __useGetMyExpQuery__
 *
 * To run a query within a React component, call `useGetMyExpQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyExpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyExpQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyExpQuery(baseOptions?: Apollo.QueryHookOptions<GetMyExpQuery, GetMyExpQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyExpQuery, GetMyExpQueryVariables>(GetMyExpDocument, options);
      }
export function useGetMyExpLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyExpQuery, GetMyExpQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyExpQuery, GetMyExpQueryVariables>(GetMyExpDocument, options);
        }
export type GetMyExpQueryHookResult = ReturnType<typeof useGetMyExpQuery>;
export type GetMyExpLazyQueryHookResult = ReturnType<typeof useGetMyExpLazyQuery>;
export type GetMyExpQueryResult = Apollo.QueryResult<GetMyExpQuery, GetMyExpQueryVariables>;
export const GetMyBadgesDocument = gql`
    query GetMyBadges {
  getMyBadges {
    badge {
      id
      name {
        ...LanguageFields
      }
      description {
        ...LanguageFields
      }
      color
      icon
      conditions {
        name {
          ...LanguageFields
        }
        description {
          ...LanguageFields
        }
        icon
        color
      }
    }
  }
}
    ${LanguageFieldsFragmentDoc}`;

/**
 * __useGetMyBadgesQuery__
 *
 * To run a query within a React component, call `useGetMyBadgesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyBadgesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyBadgesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyBadgesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyBadgesQuery, GetMyBadgesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyBadgesQuery, GetMyBadgesQueryVariables>(GetMyBadgesDocument, options);
      }
export function useGetMyBadgesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyBadgesQuery, GetMyBadgesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyBadgesQuery, GetMyBadgesQueryVariables>(GetMyBadgesDocument, options);
        }
export type GetMyBadgesQueryHookResult = ReturnType<typeof useGetMyBadgesQuery>;
export type GetMyBadgesLazyQueryHookResult = ReturnType<typeof useGetMyBadgesLazyQuery>;
export type GetMyBadgesQueryResult = Apollo.QueryResult<GetMyBadgesQuery, GetMyBadgesQueryVariables>;