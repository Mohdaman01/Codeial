{
     let createPost =  function(){
        let newPostForm = $('#post-form');
        newPostForm.submit((e)=>{
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    new PostComments(data.data.post._id);

                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'metroui',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topLeft',
                        timeout: 1500
                    }).show();
                },  
                error: function(error){
                    console.log(error.responseText);
                }
            });
            $('#text-content').val('');
        })
     }

     let newPostDom = function(post){
        return $(`<li id="post-${post._id}" class="post">
        <span><a href="/posts/destroy/${post._id}" class="delete-post-button"><i class="fa-solid fa-circle-xmark"></i></a></span>
        <div>
            <p>            
                <p class="post-content">${post.content}</p>
                <small class="post-by">By ${post.user.name}</small>
                
                <span>

                    <a href="/likes/toggle/?id=${post._id}&type=post" class="toggle-like-button" data-likes="0">0 <i class="fa-solid fa-thumbs-up"></i></a>

                </span>
            </p>
            <div class="post-comments">

                    <form id="post-${post._id}-comments-form" action="/comments/create" method="post" class="post-form">
                        <input type="text" name="content" placeholder="Type here to add comment"/>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
                
                <div class="post-comments-list">
                    <ul id="post-comments-${post._id}">
                        
                    </ul>
                </div>
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

                    new Noty({
                        theme: 'metroui',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topLeft',
                        timeout: 1500
                        
                    }).show();
                }
            })
        })
     }



     let convertPostsToAjax = function(){
        $('#post-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }
    
    createPost();
    convertPostsToAjax();
}