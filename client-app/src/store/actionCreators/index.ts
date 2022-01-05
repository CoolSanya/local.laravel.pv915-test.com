import * as LoginActionCreators from "../../components/auth/login/actions"
import * as RegisterActionCreators from "../../components/auth/register/actions"
import * as ProductActionCreators from "../../components/products/actions"

export default {
    ...RegisterActionCreators, ...LoginActionCreators, ...ProductActionCreators
}