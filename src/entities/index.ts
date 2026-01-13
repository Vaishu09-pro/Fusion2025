/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: eventgallery
 * Interface for EventGallery
 */
export interface EventGallery {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image */
  galleryImage?: string;
  /** @wixFieldType text */
  caption?: string;
  /** @wixFieldType datetime */
  dateTaken?: Date | string;
  /** @wixFieldType text */
  photographer?: string;
  /** @wixFieldType text */
  altText?: string;
  /** @wixFieldType number */
  displayOrder?: number;
}


/**
 * Collection ID: hackathonevents
 * Interface for HackathonEvents
 */
export interface HackathonEvents {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType text */
  eventLocation?: string;
  /** @wixFieldType text */
  eventDescription?: string;
  /** @wixFieldType text */
  eventTheme?: string;
  /** @wixFieldType number */
  numberOfParticipants?: number;
  /** @wixFieldType text */
  prizePool?: string;
  /** @wixFieldType text */
  registrationFee?: string;
  /** @wixFieldType number */
  maxTeamSize?: number;
  /** @wixFieldType boolean */
  lunchIncluded?: boolean;
  /** @wixFieldType text */
  prizesAndPerks?: string;
  /** @wixFieldType text */
  contactPhone?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType text */
  instagramHandle?: string;
}
