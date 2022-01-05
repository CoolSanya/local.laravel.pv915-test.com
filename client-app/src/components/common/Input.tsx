export interface IBaseInputProps {
    value: string;
    field: string;
    type?: "text" | "number" | "password" | "email" | "file";
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input = ({ value, field, onChange, className="form-control", type="text" }: IBaseInputProps) => {
    return (
        <input 
        onChange={onChange} 
        value={value} 
        name={field} 
        id={field} 
        type={type} 
        className={className}/>
    )
}

export default Input;