'use client';

import DataGrid, {
    Column,
    Editing,
    Item,
    Lookup,
    Paging,
    Toolbar
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.material.blue.light.css';

import CustomStore from 'devextreme/data/custom_store';
import { useMemo } from 'react';

const DevExtremeGrid = ({ states }) => {
    const dataSource = useMemo(
        () =>
            new CustomStore({
                async load() {
                    try {
                        const response = await fetch('/api/devextreme/load');
                        const result = await response.json();

                        return {
                            data : result
                        };
                    }
                    catch (err) {
                        throw new Error('Employee data loading Error');
                    }
                },
                async insert(values) {
                    try {
                        const response = await fetch('/api/devextreme/insert', {
                            method  : 'POST',
                            body    : JSON.stringify(values),
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        });

                        const result = await response.json();
                        return result;
                    }
                    catch (err) {
                        throw new Error('Employee insert Error');
                    }
                },
                async update(key, values) {
                    try {
                        const response = await fetch(
              `/api/devextreme/update/${encodeURIComponent(key.id)}`,
              {
                  method  : 'PUT',
                  body    : JSON.stringify(values),
                  headers : {
                      'Content-Type' : 'application/json'
                  }
              }
                        );

                        const result = await response.json();
                        return result;
                    }
                    catch (err) {
                        throw new Error('Employee update Error');
                    }
                },
                async remove(key) {
                    try {
                        fetch(`/api/devextreme/remove/${encodeURIComponent(key.id)}`, {
                            method : 'DELETE'
                        });
                        return key;
                    }
                    catch (err) {
                        throw new Error('Employee remove Error');
                    }
                }
            }),
        []
    );

    return (
        <div id="data-grid">
            <DataGrid
                id="gridContainer"
                dataSource={dataSource}
                showBorders={true}
                repaintChangesOnly={true}
            >
                <Paging enabled={false} />
                <Editing
                    refreshMode="reshape"
                    mode="cell"
                    allowUpdating={true}
                    allowAdding={true}
                    allowDeleting={true}
                    newRowPosition="last"
                />

                <Column dataField="prefix" caption="Title" width={80} />
                <Column dataField="firstName" width={170} />
                <Column dataField="lastName" width={170} />
                <Column dataField="position" width={170} />
                <Column dataField="stateId" caption="State" width={170}>
                    <Lookup dataSource={states} valueExpr="id" displayExpr="name" />
                </Column>
                <Column dataField="birthDate" dataType="date" />
                <Toolbar>
                    <Item name="addRowButton" showText="always" />
                </Toolbar>
            </DataGrid>
        </div>
    );
};

export default DevExtremeGrid;
