import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { getSinglePost, updatePost } from '../../../../services/index/posts';
import { Link, useParams } from 'react-router-dom';
import ArticleDetailSkeleton from '../../../articleDetail/components/ArticleDetailSkeleton';
import ErrorMessage from '../../../../components/ErrorMessage';
import parseJsonToHtml from '../../../../utils/parseJsonToHtml';
import { stables } from '../../../../constants';
import { HiOutlineCamera } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

function EditPosts() {
  const {slug} = useParams();
  const userState = useSelector((state) => state.user)
  const queryClient = useQueryClient()
  const [initialPhoto, setInitialPhoto] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [body, setBody] = useState(null)


  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["blog", slug],
   
  });

  const {mutate: mutateUpdatePostDetail, isLoading: isLoadingUpdatePostDetail} = useMutation({
    mutationFn: ({updatedData, slug, token}) => {
      return updatePost({
        updatedData,
        slug,
        token,
      })
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("blog", slug)
      toast.success("post is updated")
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error)
    }
  })

  useEffect(() => {
    if(!isLoading &&  !isError) {
      setInitialPhoto(data?.photo)
      setBody(parseJsonToHtml(data?.body));
    }

  },[data, isError, isLoading])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setPhoto(file);
  }
  
  const handleUpdatePost = async () => {
    let updatedData = new FormData();

    if(!initialPhoto && photo) {
      updatedData.append("postPicture",photo)
    } else if(initialPhoto && !photo){
      const urlObject = async (url) => {
        let response = await fetch(url)
        let blob = await response.blob();
        const file = new File([blob], initialPhoto, {type: blob.type})
        return file;
      }
      const picture = await urlObject(stables.UPLOAD_FOLDER_BASE_URL + data?.photo);
      updatedData.append("postPicture", picture)
    }
    updatedData.append("document", JSON.stringify({}))
    mutateUpdatePostDetail({updatedData, slug, token: userState.userInfo.token})
  }
  return (
    <div>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
          <article className="flex-1">
            <label htmlFor='postPicture' className='w-full cursor-pointer'>
              {photo ? (
                <img src={URL.createObjectURL(photo)} alt={data?.title} className='rounded-xl w-full' />
              ) : initialPhoto ? (<img src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo} alt={data?.title} className='rounded-xl w-full' />) :(
                <div className='w-full h-full bg-blue-50/50 flex justify-center items-center'>
                  <HiOutlineCamera className='w-7 h-auto text-orange-400 '/>

                </div>
              )}
              
            </label>
            <input type='file' className='sr-only' id='postPicture' onChange={handleFileChange} />
            
           
           
            <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
              {data?.title}
            </h1>
            <div className="mt-4 prose prose-sm sm:prose-base">{body}</div>
            <button disabled={isLoadingUpdatePostDetail} type='button' onClick={handleUpdatePost} className='w-full
             bg-green-500 text-white font-semibold rounded-lg px-4 py-2
              disabled:cursor-not-allowed disabled:opacity-70'>
                Update Post

            </button>
            
          </article>
        
        </section>
      )}
    </div>
  );
}

export default EditPosts