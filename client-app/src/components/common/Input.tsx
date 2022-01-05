export interface IBaseInputProps {
    value: string | number | readonly string[] | undefined | null;
    field: string;
    type?: "text" | "number" | "password" | "email";
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input = ({
    value,
    field,
    onChange,
    className = "form-control",
    type = "text",
}: IBaseInputProps) => {
    return (
        <input
            onChange={onChange}
            value={value as string | number | readonly string[] | undefined}
            name={field}
            id={field}
            type={type}
            className={className}
        />
    );
};

export default Input;
