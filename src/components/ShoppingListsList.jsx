
import { Col, Container, Row } from 'react-bootstrap';
import ShoppingListCard from '../components/ShoppingListCard';

import { ShoppingListsDataContext } from './ShoppingListsProvider';
import { UserContext } from './UserProvider';
import { useContext } from 'react';

function ShoppingListsList(props) {

    const { shoppingListsData, setShoppingListsData, shoppingListsHandlerMap } = useContext(ShoppingListsDataContext);
    const { userData } = useContext(UserContext);

    let lists_list = []


    for (var i=0; i<shoppingListsData.shoppingLists.length; i++) {
        var list_data = shoppingListsData.shoppingLists[i]
    
        if (props.filterOption === "2" && list_data.archived) continue;
        if (props.filterOption === "3" && !list_data.archived) continue;

        if ( list_data.members.includes(userData.authenticatedID) ) {
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