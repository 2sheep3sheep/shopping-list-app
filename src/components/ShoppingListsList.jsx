
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ShoppingListCard from '../components/ShoppingListCard';

import { ShoppingListsDataContext } from './ShoppingListsProvider';
import { UserContext } from './UserProvider';
import { useContext } from 'react';

function ShoppingListsList(props) {

    const { shoppingListsData, setShoppingListsData, shoppingListsHandlerMap } = useContext(ShoppingListsDataContext);
    const { userData } = useContext(UserContext);

    let lists_list = []

    const data_list = shoppingListsData.data.shoppingLists

    if ( shoppingListsData.state === "pending" ) {
        return (
            <div style={{width:"100%", justifyContent:"center", display:"flex"}}>
                <Spinner animation='border' style={{margin:"12px"}}/>
            </div>
        );
    }
 
    if ( !data_list || shoppingListsData.state === "error" ) {
        return (
            <div style={{width:"100%", justifyContent:"center", display:"flex"}}>
                Something went wrong...
            </div>
        );
    }

    for (var i=0; i<data_list.length; i++) {
        var list_data = data_list[i]
    
        if (props.filterOption === "2" && list_data.archived) continue;
        if (props.filterOption === "3" && !list_data.archived) continue;

        if ( list_data.members.includes(userData.data.authenticatedID) ) {
        lists_list.push( 
            <Col xs={12} md={6} lg={4} xl={3} style={{margin:"0px", padding:"4px"}}>
                <ShoppingListCard data={list_data}/>
            </Col>
        )    
        }
    }

    return (
        <Container style={{margin:"0"}} fluid={true}>
            <Row>
                {lists_list}
            </Row>
        </Container>

    )


}

export default ShoppingListsList;