
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ShoppingListCard from '../components/ShoppingListCard';
import ShoppingListsList from '../components/ShoppingListsList';
import CreateShoppingListModal from '../components/modals/CreateShoppingListModal';
import { useState } from 'react';
import ListFilteringTab from '../components/ListFilteringTab';


/* 

                        <Col xs={12} md={6} lg={4} xl={3}>
                            <ShoppingListCard/>
                        </Col>
*/

function Dashboard() {

    // Modal Controls ----------------

    const [ createListState, setCreateListState ] = useState( { open:false, listData:{name:""} } );
    const openCreateListModal = () => setCreateListState( {open:true, listData:{name:""}})  ;
    const closeCreateListModal  = () => setCreateListState( {...createListState, open:false} ) ;


    const [ filterOption, setFilterOption ] = useState("2");


    return (
        <div>
            <div className="Dashboard-Header" style={{alignItems:"center", marginBottom:"12px", height:"40px"}}>
                <div className='Dashboard-Title Big-Label'>My Shopping Lists</div>
            </div>
            <div className="Dashboard-Body" style={{alignItems:"center", marginBottom:"12px", height:"40px"}}>
                <ListFilteringTab filterOption={filterOption} setFilterOption={setFilterOption}/>
                <ShoppingListsList filterOption={filterOption}/>
                <div style={{width:"100%", justifyContent:"center", display:"flex", marginTop:"12px", marginBottom:"24px"}}>
                    <Button style={{boxShadow:"0 4px 12px 0px rgb(0 0 0 / 20%)"}} onClick={openCreateListModal}>+ Create Shopping List</Button>
                </div>
            </div>
            
            <div className="Dashboard-Modals" style={{opacity:"0"}}>
                <CreateShoppingListModal createListState={createListState} setCreateListState={setCreateListState} closeFunction={closeCreateListModal} />
            </div>
        </div>
  );
}

export default Dashboard;
