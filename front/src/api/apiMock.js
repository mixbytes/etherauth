import * as constructors from './mock/constructors';
import * as instances from './mock/instances';

export default function subscribeMockRequests(mockApi) {
    mockApi
        // .onAny('/constructors').reply(200, constructors.constructorListProd)
        .onAny().passThrough();

}