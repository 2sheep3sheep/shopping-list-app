import { useContext } from "react";
import { ShoppingListDataContext } from "./ShoppingListProvider";
import ListItem from "./ListItem";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import ToggleButton from "react-bootstrap/esm/ToggleButton";
import Stack from "react-bootstrap/esm/Stack";

function FilteringTab(props) {



    const options = [
        { name:"All", value:"1" },
        { name:"Uncompleted", value:"2" },
        { name:"Completed", value:"3" },
    ];

    return (
        <Stack direction="horizontal" style={{marginBottom:"12px"}}>
            <ButtonGroup>
                {
                    options.map( (option, idx) => (
                            <ToggleButton
                                key={idx}
                                type="radio"
                                id={`radio-${idx}`}
                                value={option.value}
                                checked={props.filterOption === option.value}
                                onChange={ (e) => props.setFilterOption(e.currentTarget.value) }
                            >
                                {option.name}
                            </ToggleButton>
                        )
                    )

                }
                
            </ButtonGroup>
        </Stack>

    );
}

export default FilteringTab;
