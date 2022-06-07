import { ButtonHTMLAttributes } from "react"

export type buttonType = 'default' | 'secondery' | 'delete'

export interface IButtonUiProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: buttonType
}
