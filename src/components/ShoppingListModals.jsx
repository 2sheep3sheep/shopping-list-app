import Card from 'react-bootstrap/Card';

import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useContext, useState } from 'react';
import { UserContext } from './UserProvider';
import { ShoppingListDataContext } from './ShoppingListProvider';
import InviteMemberModal from './modals/InviteMemberModal';

function ShoppingListModals(props) {

    const { inviteMemberState, setInviteMemberState } = useState(false);

    return (
            <div>
                <InviteMemberModal visible={inviteMemberState} />
            </div>
    );
}

export default ShoppingListModals;
