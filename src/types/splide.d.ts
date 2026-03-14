declare module "@splidejs/react-splide" {
  import type { ComponentType } from "react";

  export interface SplideProps {
    options?: Record<string, any>;
    children?: React.ReactNode;
    className?: string;
  }

  export interface SplideSlideProps {
    children?: React.ReactNode;
    className?: string;
  }

  export const Splide: ComponentType<SplideProps>;
  export const SplideSlide: ComponentType<SplideSlideProps>;
}
