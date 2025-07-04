"use client";

import {
  type BorderStyle,
  DataThemeProvider,
  IconProvider,
  type NeutralColor,
  type ScalingSize,
  type Schemes,
  type SolidStyle,
  type SolidType,
  type SurfaceStyle,
  ThemeProvider,
  ToastProvider,
  type TransitionStyle,
} from "@once-ui-system/core";
import type React from "react";
import { style } from "@/resources/config";
import { iconLibrary } from "@/resources/icons";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      brand={style.brand as Schemes}
      accent={style.accent as Schemes}
      neutral={style.neutral as NeutralColor}
      solid={style.solid as SolidType}
      solidStyle={style.solidStyle as SolidStyle}
      border={style.border as BorderStyle}
      surface={style.surface as SurfaceStyle}
      transition={style.transition as TransitionStyle}
      scaling={style.scaling as ScalingSize}
    >
      <DataThemeProvider>
        <IconProvider icons={iconLibrary}>
          <ToastProvider>{children}</ToastProvider>
        </IconProvider>
      </DataThemeProvider>
    </ThemeProvider>
  );
}
