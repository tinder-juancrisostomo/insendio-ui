import { Carousel as BaseCarousel, type CarouselProps as BaseCarouselProps } from '@design-system/base';

export function Carousel(props: BaseCarouselProps) {
  return (
    <div className="rounded-box bg-base-200 p-4 [&_button]:btn [&_button]:btn-sm">
      <BaseCarousel {...props} />
    </div>
  );
}
