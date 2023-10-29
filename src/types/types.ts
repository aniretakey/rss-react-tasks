export interface InputState {
  inputValue: string;
}

export interface CardsProps {
  title: string;
  imgURL: string;
  author: string;
  key: string;
}

type ImageType = {
  guid: string;
  offsetPercentageX: number;
  offsetPercentageY: number;
  width: number;
  height: number;
  url: string;
};

export interface ArtObject {
  hasImage?: boolean;
  headerImage: ImageType;
  id: string;
  links?: { self: string; web: string };
  longTitle: string;
  objectNumber: string;
  permitDownload?: boolean;
  principalOrFirstMaker: string;
  productionPlaces?: string[];
  showImage?: boolean;
  title: string;
  webImage: ImageType;
}
