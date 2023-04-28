
     let createPost =  function(){
        let newPostForm = $('#post-form');
        newPostForm.submit((e)=>{
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            })
        })
     }

     let newPostDom = function(data){
        return $(`<li id="post-${data.post._id}">
        <p>
             
            <small><a href="/posts/destroy/${data.post._id}" class="delete-post-button"><i class="fa-solid fa-circle-xmark"></i></a></small>
            
            ${data.post.content}
            <br>
            <small>${data.user}</small>
        </p>
        <div class="post-comments">

                <form action="/comments/create" method="post">
                    <input type="text" name="content" placeholder="Type here to add comment"/>
                    <input type="hidden" name="post" value="${data.post._id}">
                    <input type="submit" value="Add Comment">
                </form>
             
            <div class="post-comments-list">
                <ul id="post-comments-${data.post._id}">
                     
                </ul>
            </div>
        </div>
    </li>`) 
     }

     let deletePost = function(deleteLink){
        $(deleteLink).click((e)=>{
            e.preventDefault();

            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){

                    $(`#post-${data.data.post_id}`).remove();
                }
            })
        })
     }


     createPost();
