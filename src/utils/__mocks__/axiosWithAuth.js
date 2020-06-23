const testListId1 = "fc85a964-eec3-42eb-a076-4d7d2634b321";
const testListId2 = "d2b3833d-08b3-4dd8-96fe-822e3a608d82";

const listSeeds = [
  {
    id: "fc85a964-eec3-42eb-a076-4d7d2634b321",
    okta_uid: "00ucj17sgcvh8Axqr4x6",
    created_at: "2020-06-08 12:51:13.821025-07",
    index: 0,
    title: "list 1"
  },
  {
    id: "d2b3833d-08b3-4dd8-96fe-822e3a608d82",
    okta_uid: "00ucj17sgcvh8Axqr4x6",
    created_at: "2020-06-08 12:51:21.129036-07",
    index: 1,
    title: "list 2"
  }
];

const postSeeds = [
  {
    id: "634b0e5c-af78-425b-8ad6-4622986e2e0f",
    okta_uid: "00ucj17sgcvh8Axqr4x6",
    list_id: "fc85a964-eec3-42eb-a076-4d7d2634b321",
    created_at: "2020-06-10 13:39:52.872039-07",
    index: 0,
    post_text: "foo",
    posted: false
  },
  {
    id: "b46052ea-ba9b-48c7-8f31-3c4d9930b596",
    okta_uid: "00ucj17sgcvh8Axqr4x6",
    list_id: "fc85a964-eec3-42eb-a076-4d7d2634b321",
    created_at: "2020-06-10 13:39:58.525309-07",
    index: 1,
    post_text: "bar",
    posted: false
  },
  {
    id: "a7112c6c-75e9-4a84-aa44-357d0d90ff32",
    okta_uid: "00ucj17sgcvh8Axqr4x6",
    list_id: "fc85a964-eec3-42eb-a076-4d7d2634b321",
    created_at: "2020-06-10 13:40:02.380562-07",
    index: 2,
    post_text: "baz",
    posted: false
  },
  {
    id: "a2399166-caa5-497f-934d-2cad58c4e639",
    okta_uid: "00ucj17sgcvh8Axqr4x6",
    list_id: "d2b3833d-08b3-4dd8-96fe-822e3a608d82",
    created_at: "2020-06-10 13:40:31.648547-07",
    index: 0,
    post_text: "hello",
    posted: false
  },
  {
    id: "c6bed674-29e9-4302-800d-7c371fcee539",
    okta_uid: "00ucj17sgcvh8Axqr4x6",
    list_id: "d2b3833d-08b3-4dd8-96fe-822e3a608d82",
    created_at: "2020-06-10 13:40:36.284236-07",
    index: 1,
    post_text: "world",
    posted: false
  }
];

export const axiosWithAuth = () => ({
  get: jest.fn(url => {
    switch (url) {
      case "/lists":
        return Promise.resolve({
          data: listSeeds
        });
      case `/lists/${testListId1}/posts`:
        return Promise.resolve({
          data: postSeeds.filter(post => post.list_id === testListId1)
        });
      case `/lists/${testListId2}/posts`:
        return Promise.resolve({
          data: postSeeds.filter(post => post.list_id === testListId2)
        });
      default:
        return Promise.resolve({
          data: null
        });
    }
  }),
  post: jest.fn((url, body) => {
    switch (url) {
      case `/lists`:
        return Promise.resolve({
          data: {
            id: "e243cf16-549a-4861-970e-64bada40eb6d",
            okta_uid: "00u4lenp4ViHhg0Gj4x6",
            index: 900,
            title: body.title
          }
        });
    }
  }),
  patch: jest.fn((url, body) => {
    switch (url) {
      case `/lists/${testListId1}`:
        let [list] = listSeeds.filter(list => list.id === testListId1);

        list = {
          ...list,
          title: body.title,
          index: body.index
        };

        return Promise.resolve({
          data: list
        });

      default:
        return Promise.resolve({
          data: null
        });
    }
  }),
  put: jest.fn(),
  delete: jest.fn()
});
