import { gql } from '@apollo/client/core';
import { apolloClient } from '../../../../../services/apollo-client';
import { CREATE_COMMENT_TYPED_DATA } from '../../../../../shared/constants';

export const createCommentTypedData = (createCommentTypedDataRequest: object) => {
    return apolloClient.mutate({
     mutation: gql(CREATE_COMMENT_TYPED_DATA),
     variables: {
       request: createCommentTypedDataRequest
     },
   })
 }