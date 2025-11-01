# Create your views here.

from rest_framework.decorators import api_view, authentication_classes
from rest_framework.pagination import PageNumberPagination

from myapp.auth.authentication import AdminTokenAuthtication
from myapp.handler import APIResponse
from myapp.models import Case
from myapp.permission.permission import isDemoAdminUser, check_if_demo
from myapp.serializers import CaseSerializer
from myapp.utils import after_call, clear_cache


class MyPageNumberPagination(PageNumberPagination):
    page_size = 10  # 每页的默认项
    page_size_query_param = 'pageSize'  # 允许通过 URL 参数设置每页的大小
    max_page_size = 100  # 最大页尺寸


@api_view(['GET'])
@authentication_classes([AdminTokenAuthtication])
def list_api(request):
    if request.method == 'GET':
        keyword = request.GET.get("keyword", '')
        case = Case.objects.filter(title__contains=keyword).order_by('-create_time')

        # 分页
        paginator = MyPageNumberPagination()
        paginated_case = paginator.paginate_queryset(case, request)
        total = case.count()

        serializer = CaseSerializer(paginated_case, many=True)
        return APIResponse(code=0, msg='查询成功', data=serializer.data, total=total)


@api_view(['POST'])
@authentication_classes([AdminTokenAuthtication])
@check_if_demo
@after_call(clear_cache)
def create(request):

    if not request.data.get('title', None):
        return APIResponse(code=1, msg='标题不能为空')

    data = request.data.copy()
    serializer = CaseSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return APIResponse(code=0, msg='创建成功', data=serializer.data)
    else:
        print(serializer.errors)

    return APIResponse(code=1, msg='创建失败')


@api_view(['POST'])
@authentication_classes([AdminTokenAuthtication])
@check_if_demo
@after_call(clear_cache)
def update(request):

    try:
        pk = request.data['id']
        case = Case.objects.get(pk=pk)
    except Case.DoesNotExist:
        return APIResponse(code=1, msg='对象不存在')

    data = request.data.copy()
    serializer = CaseSerializer(case, data=data)
    if serializer.is_valid():
        serializer.save()
        return APIResponse(code=0, msg='更新成功', data=serializer.data)
    else:
        print(serializer.errors)
    return APIResponse(code=1, msg='更新失败')


@api_view(['POST'])
@check_if_demo
@authentication_classes([AdminTokenAuthtication])
def delete(request):

    try:
        ids = request.data['ids']
        ids_arr = ids.split(',')
        Case.objects.filter(id__in=ids_arr).delete()
    except Case.DoesNotExist:
        return APIResponse(code=1, msg='对象不存在')

    return APIResponse(code=0, msg='删除成功')
