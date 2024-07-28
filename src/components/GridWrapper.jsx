import { State } from '@/models';
import dynamic from 'next/dynamic';

const Grid = dynamic(() => import('./DevExtremeGrid'), {
    ssr     : false,
    loading : () => {
        return (
            <div
                style={{
                    display        : 'flex',
                    alignItems     : 'center',
                    justifyContent : 'center',
                    height         : '100vh'
                }}
            >
                <p>Loading...</p>
            </div>
        );
    }
});

const GridWrapper = async() => {
    const statesArr = await State.findAll();
    const states = statesArr.map((state) => state.dataValues);
    return (
        <>
            <Grid states={states} />
        </>
    );
};

export { GridWrapper };

