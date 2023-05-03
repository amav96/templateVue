import $http from "../../services/AxiosInstance";
import { BackEndPagination } from "../../components/Table/Table.type";

declare global {
    interface ArrayConstructor {
        isArray(arg: ReadonlyArray<any> | any): arg is ReadonlyArray<any>
    }
}

interface IGenericApi<K extends string | number > {
    data? : {
        data: Array<object> | object,
        pagination: BackEndPagination
    }
    error?: object
}

const isFileInParams = (params: any) => {
    let hasFile = false
    let array = Object.keys(params);
    for (let index = 0; index < array.length; index++) {
        const k = array[index];
        const param: object | Array<any> = params[k as keyof object];
        if(typeof param === 'object' && Array.isArray(param) && param.some((val : any) => val.type && val.type.split('/')[0] === 'image')){
            hasFile = true
            break
        }
    }
    return hasFile
}

const appendForm = async (params : any, deepFileInArray: boolean = false) :Promise<FormData> =>  {
    return new Promise((resolve) => {
      const formData = new FormData();
      Object.keys(params).forEach((key) => {
        const param = params[key as keyof object];
        if(typeof param === 'object' &&
            Array.isArray(param) &&
            (deepFileInArray || (Array.isArray(param) &&  param.some((val : any) => val.type.split('/')[0] === 'image')))){
                param.forEach((element: any, i: number) => {
                    console.log(element);
                    formData.append(`${key}[${i}]`, element);
                });
        }else {
            formData.append(key, param);
        }
      });
      resolve(formData);
    });
}

interface Config { 
    multipleFile?: boolean
}

export const serializeParams = async (params : object, config: Config = {} ) :Promise<object> => {
    let build: any = {}
    let hasFile = config.hasOwnProperty('multipleFile') ? config.multipleFile : isFileInParams(params)
    if(hasFile){
        build = await appendForm(params, hasFile)
    } else {
        Object.keys(params).forEach((key) => {
            let currentParam : any = params[key as keyof object];
            if(typeof currentParam === 'object' && Array.isArray(currentParam)){
                build[key as keyof object] = currentParam.toString()
            }else{
                build[key as keyof object] = currentParam
            }
        })
    }
    return build
}

export  const genericApi = async (url: string, method: string, params: Object = {} ) :Promise<IGenericApi<string | number>> => {
    try {
        if(method === 'GET'){
            return await $http.get(url,{ params: await serializeParams(params) });
        } else if(method === 'POST'){
            return  await $http.post(url, await serializeParams(params));
        } 
        return {
            error : ['Error inesperado']
        }
    } catch (error : any) {
        return { error: error === undefined ? 'Error BE' : error };
    }
}