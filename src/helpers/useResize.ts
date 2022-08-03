import React from 'react';

export const breakpoints = {
  xs: 360,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
} as const;

export type Breakpoints = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
};

const useResize = () => {
  const [state, setState] = React.useState<Breakpoints>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true,
  });

  const onResize = () => {
    setState(prevState => {
      const { innerWidth: width } = window;
      let hasChanged = false;

      const newState = { ...prevState };

      Object.keys(breakpoints).forEach((key: keyof typeof breakpoints) => {
        const point = breakpoints[key];
        const result = width >= point;
        if (result !== prevState[key]) hasChanged = true;
        newState[key] = result;
      });

      // To prevent unnecessary re-renders:
      if (hasChanged) {
        return newState;
      }
      return prevState;
    });
  };

  React.useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return state;
};

export default useResize;
