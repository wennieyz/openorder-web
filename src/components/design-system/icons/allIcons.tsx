import { baseColors } from "../../../styleVariables"

export type TIconStyleProps = {
  stroke?: string
  strokeWidth?: string
}

const defaultProps = {
  stroke: baseColors['--gray-70'],
  strokeWidth: '1.5',
}

const allIcons: Record<string, (props: TIconStyleProps) => React.ReactElement> = {
  Home: ({
    stroke,
    strokeWidth
  }: TIconStyleProps) => (
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
  MagnifyingGlass: ({
    stroke,
    strokeWidth
  }: TIconStyleProps) =>(
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
  ShoppingBag: ({
    stroke,
    strokeWidth
  }: TIconStyleProps) =>(
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
}

const icon = (name: IconName, props?: TIconStyleProps) => {
  const Icon = allIcons[name]
  const allProps = { ...defaultProps, ...props }
  return <Icon {...allProps}/>
}

export type IconName = keyof typeof allIcons

export default icon

