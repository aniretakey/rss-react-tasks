import React from 'react';

export interface CardsProps {
  title: string;
  imgURL: string;
  author: string;
  key: string;
  objectNum: string;
  clickHandler?: (e: React.MouseEvent<HTMLDivElement> | undefined) => void;
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
  headerImage?: ImageType;
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
  description?: string;
  materials?: string[];
  techniques?: string[];
  dating?: {
    yearEarly?: number;
  };
}

export type PaginationProps = {
  currentPage: number;
  onFirstPageClick: () => void;
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onLastPageClick: () => void;
  disablePrev: boolean;
  disableNext: boolean;
  lastPageNum: number | undefined;
};

export type cardsListPropsType = {
  cardsData: ArtObject[];
  totalCardsCount: number;
  loading: boolean;
  currentPage: number;
  lastPage: number;
  lastRequest: string;
  itemsOnPage: number;
};
