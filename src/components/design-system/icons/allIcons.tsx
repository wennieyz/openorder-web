import {baseColors} from '../../../styleVariables'

export type TIconStyleProps = {
  stroke?: string
  strokeWidth?: string
}

const defaultProps = {
  stroke: baseColors['--gray-70'],
  strokeWidth: '1.5',
}

const allIcons: Record<string, (props: TIconStyleProps) => React.ReactElement> = {
  Home: ({stroke, strokeWidth}: TIconStyleProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M9 21V13.6C9 13.04 9 12.7599 9.10899 12.546C9.20487 12.3579 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3579 14.891 12.546C15 12.7599 15 13.04 15 13.6V21M11.0177 2.76403L4.23539 8.03916C3.78202 8.39178 3.55534 8.56809 3.39203 8.78889C3.24737 8.98447 3.1396 9.20481 3.07403 9.43908C3 9.70355 3 9.99073 3 10.5651V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V10.5651C21 9.99073 21 9.70355 20.926 9.43908C20.8604 9.20481 20.7526 8.98447 20.608 8.78889C20.4447 8.56809 20.218 8.39178 19.7646 8.03916L12.9823 2.76403C12.631 2.49078 12.4553 2.35415 12.2613 2.30163C12.0902 2.25529 11.9098 2.25529 11.7387 2.30163C11.5447 2.35415 11.369 2.49078 11.0177 2.76403Z"
        stroke={stroke}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  MagnifyingGlass: ({stroke, strokeWidth}: TIconStyleProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke={stroke}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  ShoppingBag: ({stroke, strokeWidth}: TIconStyleProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M16.0004 9V6C16.0004 3.79086 14.2095 2 12.0004 2C9.79123 2 8.00037 3.79086 8.00037 6V9M3.59237 10.352L2.99237 16.752C2.82178 18.5717 2.73648 19.4815 3.03842 20.1843C3.30367 20.8016 3.76849 21.3121 4.35839 21.6338C5.0299 22 5.94374 22 7.77142 22H16.2293C18.057 22 18.9708 22 19.6423 21.6338C20.2322 21.3121 20.6971 20.8016 20.9623 20.1843C21.2643 19.4815 21.179 18.5717 21.0084 16.752L20.4084 10.352C20.2643 8.81535 20.1923 8.04704 19.8467 7.46616C19.5424 6.95458 19.0927 6.54511 18.555 6.28984C17.9444 6 17.1727 6 15.6293 6L8.37142 6C6.82806 6 6.05638 6 5.44579 6.28984C4.90803 6.54511 4.45838 6.95458 4.15403 7.46616C3.80846 8.04704 3.73643 8.81534 3.59237 10.352Z"
        stroke={stroke}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  Globe: ({stroke, strokeWidth}: TIconStyleProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M9.99999 18.3333C14.6024 18.3333 18.3333 14.6023 18.3333 9.99996C18.3333 5.39758 14.6024 1.66663 9.99999 1.66663C5.39761 1.66663 1.66666 5.39758 1.66666 9.99996C1.66666 14.6023 5.39761 18.3333 9.99999 18.3333Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M1.66666 8.6835C2.92284 8.09033 3.85193 8.00771 4.45391 8.43558C5.35691 9.07746 5.47011 11.6933 7.52395 10.4431C9.57778 9.19292 6.64445 8.6835 7.28124 6.87246C7.91803 5.06142 10.0034 6.46821 10.2108 4.48446C10.3489 3.16193 8.76699 2.65589 5.46482 2.96634"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M15 3.33337C12.619 5.41196 11.7875 6.66717 12.5053 7.09892C13.582 7.74658 14.0389 6.83475 15.3528 7.09892C16.6667 7.36312 16.3822 9.14408 15.6911 9.14408C15 9.14408 11.4208 8.68829 11.6011 10.7771C11.7814 12.8659 13.9342 13.1752 13.9342 14.3422C13.9342 15.1202 13.4579 16.3109 12.5053 17.9143"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
      />
      <path
        d="M2.54355 13.7193C2.92334 13.5536 3.20882 13.4322 3.40001 13.355C5.00297 12.7074 6.19239 12.5547 6.96818 12.897C8.34005 13.5024 7.81264 14.725 8.24234 15.1754C8.67201 15.6258 9.74501 15.4948 9.74501 16.3516C9.74501 16.9229 9.55314 17.5682 9.16939 18.2875"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
      />
    </svg>
  ),
  Recycle: ({stroke, strokeWidth}: TIconStyleProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M13.9693 8.12504L10.7471 2.54399C10.4208 1.97888 9.60105 1.99103 9.29168 2.56557L7.08334 6.66671"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.4167 16.6667H17.2587C17.9106 16.6667 18.3101 15.9518 17.9684 15.3966L15.4167 11.25"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.41662 9.58337L1.98867 15.4109C1.66188 15.9664 2.06243 16.6667 2.70694 16.6667H7.08328"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.0833 15L10.4167 16.6667L12.0833 18.3333"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.6667 7.58354L13.9434 8.19362L14.5534 5.91687"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M3.125 10.1934L5.40171 9.58337L6.01175 11.8601"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  Leaf: ({stroke, strokeWidth}: TIconStyleProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M15.4167 9.99996C15.4167 15.8724 10 18.3333 10 18.3333C10 18.3333 4.58334 16.4062 4.58334 9.99996C4.58334 3.59371 10 1.66663 10 1.66663C10 1.66663 15.4167 4.12756 15.4167 9.99996Z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 15L12.0833 12.9166"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.99999 12.0833L7.91666 10"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 9.58333L12.0833 7.5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 18.3334V5.83337"
        stroke={stroke}
        strokeWidth={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
}

const icon = (name: IconName, props?: TIconStyleProps) => {
  const Icon = allIcons[name]
  const allProps = {...defaultProps, ...props}
  return <Icon {...allProps} />
}

type TCircleIconProps = {
  fill: string
}

export const CircleIcon = ({fill}: TCircleIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
  >
    <circle cx="12" cy="12" r="11" fill={fill} />
  </svg>
)

export type IconName = keyof typeof allIcons

export default icon
