

export const WrapperIcon = (WrapperComponent, name, clickEvent = null) => {

    if(clickEvent) {
        return (
            <div className="flex space-x-2 cursor-pointer" onClick = {clickEvent}>
                <WrapperComponent className = 'h-6 w-6'></WrapperComponent>
                <h3>{name}</h3>
            </div>
        )
    }


    return (
        <div className="flex space-x-2 cursor-pointer">
            <WrapperComponent className = 'h-6 w-6'></WrapperComponent>
            <h3>{name}</h3>
        </div>
    )
}