
$(document).ready(function(){
    //storage에 있는 text를 가지고 와서 id가 article인 textarea에 넣어준다.
    chrome.storage.sync.get(['total'],function(selectedText){
        $('#article').val(selectedText.total);
    });


    $('#submit').click(function () {


        // form 태그 안에 들어있는 text들을 server에 보내기 위해서, 해당 text를 변환해준다.
        var queryString = $('#textForm').serialize();
        alert(queryString);
        // 그 text를 url로 보내고, 평가 항목을 표시하고, 평가를 실시하게 한다.
        $.ajax({
            url:'http://13.209.8.253/summary_ajax/',
            data: queryString,
            dataType:'json',
            type:'POST',
            cache : false,
            processData: false,
            // text를 보내진게 성공을 하게 된다면, 평가 할목을 표시한다.
            success: function (data) {
                var new_data = data['summary'];
                // 임시로 그냥 new_data를 summayText textarea에 넣어주었다.
                $('#summary').val(new_data);
                //평가 항목 html을 추가하고, click 이벤트를 넣어서 평가를 서버에 보내는게 한다.
                $('#evaluate').load('evaluate.html',function(){
                    $('#star_rating').raty({
                        path: '/images/',
                        click: function(allScore,evnet) {

                                var rate = $('#star_rating').raty('score',allScore);
                                //별점 값 textarea에 표시
                                var test = $('#star_rating').raty('score');
                                var evalValue = $('#score').serialize();
                                alert(evalValue);
                                $.ajax({
                                    url: 'http://13.209.8.253/eval_ajax/',
                                    data: evalValue,
                                    dataType: 'json',
                                    type: 'POST',
                                    success: function(data){
                                        var evaluate = data['score'];
                                        alert(evaluate +'  thank you for your evaluation');
                                    }
                                    , error: function (request) {
                                        alert('error')
                                    }

                                });
                                //이 작업이 끝나면 textarea를 모두 초기화 시킨다.
                                $('#article').val(" ");
                                $('#summary').val(" ");

                            }


                            })

                    });
                }
                ,error:function(request,status,error){
                alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            }

                });
            })

        });
