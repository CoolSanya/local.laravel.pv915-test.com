import { useEffect, useRef, useState } from "react";
import Cropper from "cropperjs";
import Modal from "react-bootstrap/Modal";
import ReactCropperElement from "react-bootstrap/Modal";

import "bootstrap/dist/css/bootstrap.min.css";
import "cropperjs/dist/cropper.css";

export interface ModalGroupProps {
    onChange: (field: string, value: string) => void;
    field: string;
    value?: string | undefined | null;
}

const ModalPage = ({ field, onChange, value }: ModalGroupProps) => {
    const defaultImage =
        "https://www.pinclipart.com/picdir/middle/333-3334742_car-icons-pdf-car-icon-clipart.png";
    const [isShow, setIsShow] = useState<boolean>(false);
    const cropperRef = useRef<HTMLImageElement>(null);
    const [imgSrc, setImgSrc] = useState<string>(defaultImage);
    const [cropperObj, setCropperObj] = useState<Cropper>();
    const [base64, setBase64] = useState<string>("");

    useEffect(() => {
        if (value) {
            setImgSrc(`http://local.laravel.pv915-test.com:8000/images/${value}`);
        }
        if (cropperRef.current) {
            const cropper = new Cropper(
                cropperRef.current as HTMLImageElement,
                {
                    aspectRatio: 3 / 4,
                    checkCrossOrigin: false,
                }
            );
            cropper.replace(imgSrc);
            setCropperObj(cropper);
        }
    }, [isShow]);

    const handleModalShow = () => {
        setIsShow(true);
    };
    const handleModalCancel = () => {
        setIsShow(false);
    };
    const handleModalConfirm = () => {
        const base = cropperObj?.getCroppedCanvas().toDataURL() as string;
        setImgSrc(base);
        setIsShow(false);
        onChange(field, base);
    };

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsShow(true);
        console.log("isShow: ", isShow);

        const files = event.target.files;
        if (!(files && files[0])) {
            return;
        }
        const url = URL.createObjectURL(files[0]);
        setImgSrc(url);
        cropperObj?.replace(url);
    };

    const rotate = () => {
        cropperObj?.rotate(90);
    };

    return (
        <div className="row">
            <label htmlFor="inputImg">
                <img src={imgSrc} width="150" alt="user img" />
            </label>
            <input
                type="file"
                style={{ display: "none" }}
                className="form-control"
                id="inputImg"
                onChange={selectImage}
            />

            {isShow && (
                <Modal show={true}>
                    <Modal.Header>Image cropping</Modal.Header>
                    <Modal.Body>
                        <img
                            id="img"
                            src={imgSrc}
                            ref={cropperRef}
                            width="80%"
                        />
                        <div className="row">
                            <button
                                className="btn btn-info col-3"
                                onClick={rotate}
                            >
                                Rotate
                            </button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            className="btn btn-success"
                            onClick={handleModalConfirm}
                        >
                            Confirm
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={handleModalCancel}
                        >
                            Cancel
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default ModalPage;
