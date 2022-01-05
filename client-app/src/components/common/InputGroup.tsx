import Input, { IBaseInputProps } from "./input";

export interface IBaseInputGroupProps extends IBaseInputProps {
    label: string;
}

const InputGroup = ({ value, field, onChange, label, type="text" }: IBaseInputGroupProps) => {
    return (
        <div className="mb-3">
          <Input value={value} onChange={onChange} field={field} type={type} />
          <label htmlFor={field} className="form-label">{label}</label>
        </div>
    )
}

export default InputGroup;