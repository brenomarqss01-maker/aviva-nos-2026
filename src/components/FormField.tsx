import type { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface BaseProps {
  id: string
  label: string
  hint?: string
  error?: string
  optional?: boolean
}

type InputProps = BaseProps & InputHTMLAttributes<HTMLInputElement> & { multiline?: false }
type TextareaProps = BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { multiline: true }
type FormFieldProps = InputProps | TextareaProps

export function FormField(props: FormFieldProps) {
  const { id, label, hint, error, optional, multiline, className, ...fieldProps } = props
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined

  return (
    <div className={`form-field ${error ? 'has-error' : ''} ${className ?? ''}`}>
      <label htmlFor={id}>
        {label} {optional && <span className="optional-label">Opcional</span>}
      </label>
      {hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
      {multiline ? (
        <textarea
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="field-error" id={`${id}-error`} role="alert"><span aria-hidden="true">!</span>{error}</p>}
    </div>
  )
}

export type InputChange = ChangeEvent<HTMLInputElement>
