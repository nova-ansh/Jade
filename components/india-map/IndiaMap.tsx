"use client";

import React, {
  useId,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import indiaGeo from "./india-paths.json";

export interface StateData {
  id: string;
  name: string;
  value?: number;
  label?: string;
  color?: string;
  customData?: Record<string, unknown>;
}

export interface IndiaMapProps {
  data?: Record<string, StateData>;
  onStateClick?: (state: StateData) => void;
  onStateHover?: (state: StateData | null) => void;

  defaultColor?: string;
  hoverColor?: string;
  strokeColor?: string;
  strokeWidth?: number;

  showTooltip?: boolean;
  animated?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}

type GeoState = {
  id: string;
  name: string;
  d: string;
};

const KERALAM_ID = "kl";

/*
 * Your visited states.
 *
 * ADD / REMOVE IDs here.
 *
 * Common IDs:
 * pb = Punjab
 * hp = Himachal Pradesh
 * hr = Haryana
 * dl = Delhi
 * rj = Rajasthan
 * up = Uttar Pradesh
 * uk = Uttarakhand
 * kl = Keralam
 * mh = Maharashtra
 * ga = Goa
 * ka = Karnataka
 * tn = Tamil Nadu
 * ap = Andhra Pradesh
 * ts = Telangana
 * wb = West Bengal
 * gj = Gujarat
 * mp = Madhya Pradesh
 * od = Odisha
 * br = Bihar
 * jh = Jharkhand
 * as = Assam
 *
 * Keep only the states YOU have actually visited.
 */
const visitedStates = new Set<string>([
  "pb",
  "dl",
  "la",
  "jk",
  "ch",
  "as",
  "hp",
]);

const stateNameOverrides: Record<string, string> = {
  kl: "Keralam",
};

function getDisplayName(state: GeoState) {
  return stateNameOverrides[state.id] ?? state.name;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  data = {},
  onStateClick,
  onStateHover,

  defaultColor = "#15191f",
  hoverColor = "#8caedc",
  strokeColor = "rgba(130, 155, 185, 0.30)",
  strokeWidth = 0.8,

  showTooltip = true,
  animated = true,
  className = "",
  width = "100%",
  height = "auto",
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
  });

  const [mounted, setMounted] = useState(false);

  const mapId = useId().replace(/:/g, "");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const states = (
    indiaGeo as {
      viewBox: string;
      states: GeoState[];
    }
  ).states;

  const viewBox = (
    indiaGeo as {
      viewBox: string;
    }
  ).viewBox;

  const getStateInfo = useCallback(
    (state: GeoState): StateData => {
      return (
        data[state.id] ?? {
          id: state.id,
          name: getDisplayName(state),
        }
      );
    },
    [data]
  );

  const handleMouseEnter = useCallback(
    (
      state: GeoState,
      event: React.MouseEvent<SVGPathElement>
    ) => {
      setHoveredId(state.id);

      const stateData = getStateInfo(state);

      onStateHover?.(stateData);

      setTooltipPos({
        x: Math.min(
          event.clientX + 16,
          window.innerWidth - 220
        ),
        y: Math.max(
          event.clientY - 70,
          12
        ),
      });
    },
    [getStateInfo, onStateHover]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGPathElement>) => {
      setTooltipPos({
        x: Math.min(
          event.clientX + 16,
          window.innerWidth - 220
        ),
        y: Math.max(
          event.clientY - 70,
          12
        ),
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredId(null);
    onStateHover?.(null);
  }, [onStateHover]);

  const handleClick = useCallback(
    (state: GeoState) => {
      onStateClick?.(getStateInfo(state));
    },
    [getStateInfo, onStateClick]
  );

  const hoveredState = useMemo(() => {
    if (!hoveredId) return null;

    const state = states.find(
      (item) => item.id === hoveredId
    );

    return state ? getStateInfo(state) : null;
  }, [hoveredId, states, getStateInfo]);

  return (
    <div
      className={`relative w-full ${className}`}
      role="region"
      aria-label="Interactive map of India"
      style={{
        opacity: animated && !mounted ? 0 : 1,
        transform:
          animated && !mounted
            ? "translateY(8px) scale(0.985)"
            : "translateY(0) scale(1)",
        transition:
          "opacity 600ms ease, transform 600ms ease",
      }}
    >
      {/* MAP */}

      <svg
        viewBox={viewBox}
        width={width}
        height={height}
        className="h-auto w-full select-none"
        aria-label="Map showing places visited in India"
      >
        <defs>
          <filter
            id={`${mapId}-glow`}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur
              in="SourceAlpha"
              stdDeviation="2.5"
              result="blur"
            />

            <feFlood
              floodColor="#8caedc"
              floodOpacity="0.35"
              result="color"
            />

            <feComposite
              in="color"
              in2="blur"
              operator="in"
              result="shadow"
            />

            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g>
          {states.map((state) => {
            const isVisited = visitedStates.has(
              state.id
            );

            const isHovered =
              hoveredId === state.id;

            let fill = defaultColor;

            if (isVisited) {
              fill = "#6f91bd";
            }

            if (isHovered) {
              fill = isVisited
                ? "#a8c4e8"
                : "#35475c";
            }

            return (
              <path
                key={state.id}
                d={state.d}
                fill={fill}
                stroke={
                  isHovered
                    ? "rgba(166, 196, 230, 0.75)"
                    : strokeColor
                }
                strokeWidth={
                  isHovered
                    ? strokeWidth * 1.7
                    : strokeWidth
                }
                strokeLinejoin="round"
                strokeLinecap="round"
                filter={
                  isHovered
                    ? `url(#${mapId}-glow)`
                    : undefined
                }
                style={{
                  cursor: "pointer",
                  transition:
                    "fill 180ms ease, stroke 180ms ease",
                }}
                tabIndex={0}
                role="button"
                aria-label={`${getDisplayName(
                  state
                )} state`}
                onMouseEnter={(event) =>
                  handleMouseEnter(
                    state,
                    event
                  )
                }
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() =>
                  handleClick(state)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" ||
                    event.key === " "
                  ) {
                    event.preventDefault();
                    handleClick(state);
                  }
                }}
              />
            );
          })}
        </g>
      </svg>

      {/* TOOLTIP */}

      {showTooltip && hoveredState && (
        <div
          className="pointer-events-none fixed z-50"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
          }}
        >
          <div className="min-w-[145px] border border-blue-300/[0.18] bg-[#11161e]/95 px-3 py-2 shadow-2xl backdrop-blur-xl">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200/45">
              State
            </div>

            <div className="mt-1 font-serif text-[16px] text-white/90">
              {hoveredState.name}
            </div>

            {visitedStates.has(
              hoveredState.id
            ) && (
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-blue-300/60">
                Visited
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEGEND */}

      <div className="mt-6 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 bg-[#6f91bd]" />

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
            Visited
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 border border-white/[0.12] bg-[#15191f]" />

          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
            Not Visited
          </span>
        </div>
      </div>
    </div>
  );
};