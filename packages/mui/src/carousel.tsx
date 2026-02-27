import { Carousel as BaseCarousel, type CarouselProps as BaseCarouselProps } from '@design-system/base';

export function Carousel(props: BaseCarouselProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 [&_button]:rounded-md [&_button]:border [&_button]:border-gray-300 [&_button]:bg-white [&_button]:px-3 [&_button]:py-1 [&_button]:text-sm [&_button]:hover:bg-gray-100">
      <BaseCarousel {...props} />
    </div>
  );
}
