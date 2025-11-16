function UserProfileIcon(props) {
    
    /*

        Random color generation script adapted from:
        https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript

    */
    
    let hash = 0;
    props.username.split('').forEach(char => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xee | 0x33
        colour += value.toString(16).padStart(2, '0')
    }

    return (
        <div className="User-Icon" style={{...props.style, backgroundColor:colour}}>
            {props.username}
        </div>
    )

}

export default UserProfileIcon