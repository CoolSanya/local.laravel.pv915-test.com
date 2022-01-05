export interface IBaseInputProps {
    field: string;
    type?: "file";
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    accept: string;
}

const FileInput = ({ field, onChange, className="form-control", type="file", accept="image/jpg, image/gif" }: IBaseInputProps) => {
    return (
        <input 
        onChange={onChange} 
        id={field} 
        type="file"
        className={className}
        accept={accept}
        />
    )
}

export default FileInput;