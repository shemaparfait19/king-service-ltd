import data from './placeholder-images.json';

type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

let images: ImagePlaceholder[];

try {
  if (data && Array.isArray((data as any).placeholderImages)) {
    // Correctly access the nested array
    images = (data as any).placeholderImages;
  } else {
    images = [];
    console.error("placeholder-images.json is not in the expected format or is empty.");
  }
} catch (error) {
  images = [];
  console.error("Failed to parse placeholder-images.json:", error);
}


export const PlaceHolderImages: ImagePlaceholder[] = images;
