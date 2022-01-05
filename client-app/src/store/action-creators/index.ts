import * as AuthActionCreators from '../../components/auth/Login/action';
import * as RegisterActionCreators from '../../components/auth/Register/action'
import * as ProductActionCreators from '../../components/products/actions';

export default {
    ...RegisterActionCreators,
    ...AuthActionCreators,
    ...ProductActionCreators,
}