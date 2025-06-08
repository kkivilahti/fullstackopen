const Notification = ({ data }) => {
    let style = {
        fontSize: 16,
        marginBottom: 20,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        width: 'fit-content',
    };

    if (data.type === 'error') {
        style = { ...style, color: 'red' };
    } else if (data.type === 'success') {
        style = { ...style, color: 'green' };
    }

    return (
        <div style={style}>
            {data.message}
        </div>
    );
};

export default Notification;