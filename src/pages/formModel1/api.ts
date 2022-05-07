import ajax, { Res } from '../../common/axios';

export const submit = async (data: any): Promise<Res<null>> => {
  return ajax.post<any, Res<null>>('/post', {
    fileName: 'getconfig',
    data
  });
}
