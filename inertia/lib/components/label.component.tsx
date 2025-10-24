export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export const Label = (props: LabelProps) => {
  const { className, htmlFor, children, ...rest } = props
  return (
    <label className={'label'.concat(' ', className || '')} htmlFor={htmlFor} {...rest}>
      {children}
    </label>
  )
}
