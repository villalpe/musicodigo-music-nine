import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listArticleDetails, updateArticle } from '../actions/articleActions';
import FormContainer from '../components/FormContainer'
import { ARTICLE_UPDATE_RESET } from '../constants/articleConstants'
import EditorToolbar, { modules, formats } from "./EditToolbar";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ArticleEditScreen() {

    const { id } = useParams()
    const articleId = id

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [author, setAuthor] = useState('')
    const [comment_rtf, setComment_rtf] = useState('')
        
    const [uploading, setUploading] = useState(false)
                  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    //const location = useLocation()

    const articleDetails = useSelector(state => state.articleDetails)
    const { loading, article, error } = articleDetails

    const articleUpdate = useSelector(state => state.articleUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = articleUpdate
    

    useEffect(() => {

        if(successUpdate){
            dispatch({ type: ARTICLE_UPDATE_RESET })
            navigate(`/articlelist`)
        }else{
            if(!article.name || article._id !== Number(articleId)){
                dispatch(listArticleDetails(articleId))
            }else{
                setName(article.name)
                setAuthor(article.author)
                setComment_rtf(article.comment_rtf)
            }
        }
    }, [article, articleId, dispatch, navigate, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateArticle({
            _id: articleId,
            name,
            author,
            comment_rtf,
         }))
    }

    const uploadFileHandler = async (e) => {

        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('article_id', articleId)

        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/articles/upload/', formData, config)


            setImage(data)
            setUploading(false)
            

        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

   
  return (
    <div className='container'>
    <Link to='/articlelist' className='btn btn-light m-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>
       Go Back
    </Link>

      <h1 style={{ fontFamily: 'rm_typerighter'}}>Editar Blog</h1>
         {loadingUpdate && <Loader />}
         {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}  
         {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
         (
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name' className='my-2'>
               <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Nombre</h3></Form.Label>
               <Form.Control
                   type='text'
                   placeholder='Ingresa el nombre'
                   value={name}
                   onChange={(e) => setName(e.target.value)}
               >
               </Form.Control>
           </Form.Group>
          
            <Form.Group controlId='author' className='mt-3'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Autor</h3></Form.Label>
                <Form.Text><p className='fw-bolder text-warning fs-5'><b>Nombre que aparece en la comunidad musicodigo</b></p></Form.Text>
                <Form.Control
                    type='text'
                    placeholder={'Ingresa el Autor'}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                </Form.Control>
            </Form.Group>
            <Form.Group>

            <Form.Group className='mt-3'>
                <Form.Label><h3 style={{ fontFamily: 'rm_typerighter'}}>Imagen</h3></Form.Label>
                <Form.Text><p><a className='fw-bolder text-warning fs-5' target="_blank" href='https://www.simpleimageresizer.com/upload'>Para cambiar el tamaño o resolución de la imagen</a></p></Form.Text>
                <Form.Text><p className='fw-bolder text-warning fs-5'><b>Imagen 640x430px - peso +- 80k</b></p></Form.Text>
                <Form.Control
                    type='text'
                    placeholder='Ingresa la Imagen'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                >
                </Form.Control>

                <Form.Control
                    type='file'
                    id='image-file'
                    label='Choose Image'
                    custom
                    onChange={uploadFileHandler}
                >
                
                </Form.Control>
                {uploading && <Loader />}                    
            </Form.Group>

            <Form.Label className='mt-3'><h3 style={{ fontFamily: 'rm_typerighter'}}>Comentarios</h3></Form.Label>
            <Form.Text><p><a className='fw-bolder text-warning fs-5' target="_blank" href='https://www.simpleimageresizer.com/upload'>Importante: Si va a subir una imagen al editor, aquí para bajar el tamaño o la resolución</a></p></Form.Text>
            <div className='my-2 container-fluid text-dark'  >
                <EditorToolbar />
                <ReactQuill 
                    theme="snow" 
                    value={comment_rtf} 
                    onChange={setComment_rtf}
                    placeholder={"Escribe algo increible..."}
                    modules={modules}
                    formats={formats}
                />
            </div>

             </Form.Group>

           <Button type='submit' className='btn btn-light mt-2' style={{ backgroundColor: '#27365A', color: '#00DDFF'}}>Actualizar</Button>
       </Form>
     )} 

</div>
  )
}

export default ArticleEditScreen