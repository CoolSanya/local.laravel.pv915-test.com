import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { IProduct, ProductErrors, ISearchProduct } from "./types";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getAllJSDocTagsOfKind } from "typescript";
import { triggerAsyncId } from "async_hooks";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import InputGroup from "../common/inputGroup";
import * as qs from "qs";
import { toInteger } from "lodash";

const Products = () => {
    const { getProducts, removeProduct } = useActions();
    const { products, last_page } = useTypedSelector((redux) => redux.product);
    const [isSubmited, setIsSubmitted] = useState<boolean>(false);
    var Loader = require("react-loader");
    const navigator = useNavigate();
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState<ISearchProduct>({
        page: searchParams.get("page"),
        name: searchParams.get("name") ? searchParams.get("name")?.toString(): "",
        detail: searchParams.get("detail") ? searchParams.get("detail")?.toString(): "",
    });
    const [tmpSearch, setTmpSearch] = useState<ISearchProduct>({
        page: search.page,
        name: search.name,
        detail: search.detail,
    });

    useEffect(() => {
        async function fetchProducts() {
            setIsSubmitted(true);
            try {
                await getProducts(search);
                console.log(products);
                
                setIsSubmitted(false);
            } catch (error) {
                setIsSubmitted(false);
            }
        }
        fetchProducts();
    }, [search]);

    const buttons = [];
    for (var i = 1; i <= last_page; i++) {
        buttons.push(i);
    }

    const handleRemove = (id: number) => {
        setIsSubmitted(true);
        try {
            removeProduct(id);
            setIsSubmitted(false);
            toast.success(`Product with id ${id} successfully deleted`);
        } catch (error) {
            const serverErrors = error as ProductErrors;
            if (serverErrors.error) {
                toast.error(serverErrors.error);
            }
            setIsSubmitted(false);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTmpSearch({
            ...tmpSearch,
            [e.target.name]: e.target.value,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        setSearch({
            ...search,
            name: tmpSearch.name,
            detail: tmpSearch.detail,
            page: 1,
        });
        navigator("?" + qs.stringify(search));
    };

    const handleResetSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        navigator("/products");
    };

    const handleEdit = (id: number) => {};

    return (        
        <>
            <Loader loaded={!isSubmited}>
                <div className="row">

                    <div>
                        <div className="row">
                            <div className="col-2">
                                <Link className="btn btn-outline-primary" to="add">Add product</Link>
                            </div>
                            <div className="col-3">
                                <InputGroup
                                    type="text"
                                    value={tmpSearch.name}
                                    label="Name"
                                    field="name"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-3">
                                <InputGroup
                                    type="text"
                                    className="form-control"
                                    value={tmpSearch.detail}
                                    label="Detail"
                                    field="detail"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-4 ">
                                <button className="btn btn-outline-dark" onClick={handleSearchSubmit}>Search</button>&nbsp;
                                <button className="btn btn-outline-dark" onClick={handleResetSubmit}>Reset</button>
                            </div>
                        </div>

                        {!products || products.length === 0 ? (
                            <h1>List is empty</h1>
                        ) : (
                            <>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col" className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(
                                            (product: IProduct, id: number) => (
                                                <tr
                                                    className="table-active"
                                                    key={id}
                                                >
                                                    <th scope="row">
                                                        <img
                                                            src={`http://local.laravel.pv915-test.com/images/${product.image}`}
                                                            alt=""
                                                            width="100px"
                                                        />
                                                    </th>
                                                    <td>{product.name}</td>
                                                    <td>{product.detail}</td>
                                                    <td className="me-2 text-center">
                                                            
                                                            <Link
                                                                to={`/products/edit?${qs.stringify(
                                                                    product
                                                                )}`}
                                                                className="btn btn-warning"
                                                            >
                                                                Edit
                                                            </Link>&nbsp;
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        product.id
                                                                    )
                                                                }
                                                            >
                                                                Remove
                                                            </button>
                                                    </td>
                                                    
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                                {buttons.map((item, key) => {
                                    const page: ISearchProduct = {
                                        ...search,
                                        page: item,
                                    };

                                    return (
                                        <Link
                                            onClick={() => {
                                                setSearch(page);
                                            }}
                                            key={key}
                                            to={"?" + qs.stringify(page)}
                                            className="btn btn-success"
                                        >
                                            {item}
                                        </Link>
                                    );
                                })}
                            </>
                        )}
                    </div>
                </div>
            </Loader>
        </>
    );
};

export default Products;
