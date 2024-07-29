'use client';

import { MessageDialog } from '@bryntum/grid';
import { BryntumGrid } from '@bryntum/grid-react';
import { useEffect, useRef, useState } from 'react';
import BryntumGridToolbar from './BryntumGridToolbar';

export default function Grid({ states }) {
    const [gridConfig] = useState({
        cellEditFeature : true,
        store           : {
            createUrl         : '/api/bryntum/create',
            readUrl           : '/api/bryntum/load',
            updateUrl         : '/api/bryntum/update/',
            deleteUrl         : '/api/bryntum/delete/',
            autoLoad          : true,
            autoCommit        : true,
            useRestfulMethods : true,
            httpMethods       : {
                read   : 'GET',
                create : 'POST',
                update : 'PATCH',
                delete : 'DELETE'
            },
            listeners : {
                beforeRequest : (event) => {
                    if (event.action === 'create') {
                        const newItem = event.body.data[0];
                        delete newItem.id;
                        event.body = newItem;
                    }
                    if (event.action === 'update') {
                        const updatedItem = event.body.data[0];
                        const itemId = updatedItem.id;
                        delete updatedItem.id;
                        event.body = updatedItem;
                        event.source.updateUrl = `/api/bryntum/update/${itemId}/`;
                    }
                }
            }
        },
        columns : [
            {
                text  : 'Title',
                field : 'prefix',
                width : 80,
                cls   : 'left-padding'
            },
            {
                text  : 'First Name',
                field : 'firstName',
                width : 170
            },
            {
                text  : 'Last Name',
                field : 'lastName',
                width : 170
            },
            {
                text  : 'Position',
                field : 'position',
                width : 170
            },
            {
                text     : 'State',
                field    : 'stateId',
                width    : 170,
                renderer : ({ value }) => {
                    return states.find((state) => state.id === value)?.name;
                },
                editor : {
                    type         : 'combo',
                    items        : states,
                    displayField : 'name',
                    valueField   : 'id'
                }
            },
            {
                text   : 'Birth date',
                field  : 'birthDate',
                type   : 'date',
                format : 'YYYY/MM/DD',
                flex   : 1
            },
            {
                type    : 'action',
                width   : 40,
                actions : [
                    {
                        cls     : 'b-fa b-fa-trash',
                        tooltip : 'Delete item',
                        onClick : async({ record }) => {
                            if (
                                (await MessageDialog.confirm({
                                    title   : 'Please confirm',
                                    message : 'Are you sure you want to delete this record?'
                                })) === MessageDialog.okButton
                            ) {
                                record.remove();
                            }
                        }
                    }
                ]
            }
        ]
    });
    const gridRef = useRef(null);
    const toolbarRef = useRef(null);

    useEffect(() => {
        // Bryntum Grid instance
        const grid = gridRef?.current?.instance;
    }, []);

    return (
        <div className="bryntum-grid-container">
            <BryntumGridToolbar ref={toolbarRef} gridRef={gridRef} />
            <BryntumGrid ref={gridRef} {...gridConfig} />
        </div>
    );
}
