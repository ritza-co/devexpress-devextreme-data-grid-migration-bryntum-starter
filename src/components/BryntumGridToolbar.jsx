import { BryntumToolbar } from '@bryntum/grid-react';
import { forwardRef, useCallback, useEffect, useState } from 'react';

const BryntumGridToolbar = forwardRef((props, toolbarRef) => {
    const { gridRef } = props;
    const [grid, setGrid] = useState();

    useEffect(() => {
        setGrid(gridRef.current.instance);
    }, [gridRef]);

    const handleAddAction = useCallback(() => {
        const store = grid.store;
        const added = store.add({});
        grid.selectedRecord = added[0];
    }, [grid]);

    return (
        <>
            <BryntumToolbar
                ref={toolbarRef}
                items={[
                    '->',
                    {
                        type     : 'button',
                        ref      : 'addButton',
                        icon     : 'b-fa-plus-circle',
                        text     : 'Add a row',
                        tooltip  : 'Add a row',
                        onAction : handleAddAction
                    }
                ]}
            />
        </>
    );
});

BryntumGridToolbar.displayName = 'BryntumGridToolbar';
export default BryntumGridToolbar;
