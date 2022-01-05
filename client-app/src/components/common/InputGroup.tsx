import Input, { IBaseInputProps } from "./Input";

export interface IBaseInputGroupProps extends IBaseInputProps {
    label: string;
    errors: Array<string> | undefined;
}

const InputGroup = ({ value, field, errors, onChange, label, type="text" }: IBaseInputGroupProps) => {
    return (
        <div className="mb-3">
          <label htmlFor={field} className="form-label">{label}</label>
          <Input value={value} onChange={onChange} field={field} type={type} />
          <span className="text-danger">{errors}</span>
        </div>
    )
}

export default InputGroup;