import json

from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST
from django.shortcuts import redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib import messages
from .models import *
from .serializers import *
#import csv
from datetime import datetime
import random

def readRAMInfo():  
    #type,brand,ddr_gen,channel,capacity,clock_rate,remark,price,original_info
    ram = []
    product = []
    file = open("api/ram_info.csv", "r", encoding="utf-8")
    data = list(csv.reader(file, delimiter=","))
    file.close()
    try:
        maxid = Product.objects.latest('product_id').product_id
    except:
        maxid = 0
    idx = 1
    for i in range(1, len(data)):
        isExist = RAM.objects.filter(ram_type = data[i][0], ddr_gen = data[i][2], channel = data[i][3], capacity = data[i][4], clock_rate = data[i][5], remark = data[i][6]).count()
        if isExist == 0:
            ram = RAM(product_id = idx+maxid, ram_type = data[i][0], ddr_gen = data[i][2], channel = data[i][3], capacity = data[i][4], clock_rate = data[i][5], remark = data[i][6])
            product = Product(product_id = idx+maxid, brand = data[i][1], price = data[i][7], original_info = data[i][8], left = 1000, product_type = "RAM")
            ram.save()
            product.save()
            idx += 1

def readHDDInfo():  
    #type,brand,ddr_gen,channel,capacity,clock_rate,remark,price,original_info
    hdd = []
    product = []
    file = open("api/hdd_info.csv", "r", encoding="utf-8")
    data = list(csv.reader(file, delimiter=","))
    file.close()
    try:
        maxid = Product.objects.latest('product_id').product_id
    except:
        maxid = 0
    idx = 1
    for i in range(1, len(data)):
        isExist = HDD.objects.filter(hdd_type = data[i][0], series = data[i][2], capacity = data[i][3], memory = data[i][4], model = data[i][5], RPM = data[i][6], warranty = data[i][7]).count()
        if isExist == 0:
            hdd = HDD(product_id = idx+maxid, hdd_type = data[i][0], series = data[i][2], capacity = data[i][3], memory = data[i][4], model = data[i][5], RPM = data[i][6], warranty = data[i][7])
            product = Product(product_id = idx+maxid, brand = data[i][1], price = data[i][8], original_info = data[i][9], left = 1000, product_type = "HDD")
            hdd.save()
            product.save()
            idx+=1

def readSSDInfo():  
    #type,brand,ddr_gen,channel,capacity,clock_rate,remark,price,original_info
    ssd = []
    product = []
    file = open("api/ssd_info.csv", "r", encoding="utf-8")
    data = list(csv.reader(file, delimiter=","))
    file.close()
    try:
        maxid = Product.objects.latest('product_id').product_id
    except:
        maxid = 0
    idx=1
    for i in range(1, len(data)):
        isExist = SSD.objects.filter(ssd_type = data[i][0], capacity = data[i][2], read_speed = data[i][3], write_speed = data[i][4], warranty = data[i][5]).count()
        if isExist == 0:
            ssd = SSD(product_id = idx+maxid, ssd_type = data[i][0], capacity = data[i][2], read_speed = data[i][3], write_speed = data[i][4], warranty = data[i][5])
            product = Product(product_id = idx+maxid, brand = data[i][1], price = data[i][6], original_info = data[i][7], left = 1000, product_type = "SSD")
            ssd.save()
            product.save()
            idx += 1

def submitAccount_view(request):
    """
    check if the user already exists
    if not subit username and password into database
    user_id will be create automatically when the account is create
    """
    username = request.POST.get('username')
    password = request.POST.get('password')
    try:
        maxid = Users.objects.latest('user_id').user_id + 1
    except:
        maxid = 1

    try:
        if Users.objects.filter(user_name=username, password=password).exists():
            messages.warning(request, "User already exist")
            return redirect("/login/")
        else:
            object = Users(user_id=maxid, user_name=username,password=password)
            object.save()
            messages.warning(request, "Success!")
            return redirect('/login/')
    except ValueError:
        messages.warning(request, "Fail to register account: ValueError")
        return redirect("/login/")

@require_POST
def deleteAccount_view(request):

    """
    delete account from database
    then terminate login cookie and redirect to the login page
    """
    user_id = request.session["is_login"]
    Cart.objects.filter(user_id = user_id).delete()
    Collection.objects.filter(user_id = user_id).delete()
    orders = Order.objects.filter(user_id = user_id)
    for o in orders:
        Order_Product.objects.filter(order_id = o.order_id).delete()
    orders.delete()

    try:
        Users.objects.filter(user_id=user_id).delete()
        rep = redirect("/login/") #redirect to login page 
        del request.session["is_login"]
        return rep
    except ValueError:
        messages.warning(request, "Fail to delete account: ValueError")
        return redirect("/login/")



def login_view(request):

    """
    check if the user exist
    if user exist set login cookie to true
    then redirect to home page
    """
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        if username is None or password is None:
            messages.warning(request, "Please provide both username and password")
            return redirect("/login/")
        
        if Users.objects.filter(user_name=username, password=password).exists():
            userid = Users.objects.get(user_name=username, password=password).user_id
            rep = redirect("/home")
            request.session["is_login"] = userid
            
            return redirect("/home")
        else:
            messages.warning(request, "Username or Password is wrong.")
            return redirect("/login/")


def logout_view(request):
    #  redirect to login page and set login cookie to false

    if not 'is_login' in request.session:
        return redirect('/login/')
    
    rep = redirect("/login/")    
    del request.session["is_login"]      
    return rep

@api_view(['GET'])
def get_username(request):
    try:
        userid = request.session["is_login"]
        username = Users.objects.get(user_id = userid).user_name
        return JsonResponse({"username": username})
    except:
        return JsonResponse({"username": " "})
        
@ensure_csrf_cookie
def session_view(request):
    """
    Checks if the user is authenticated and returns a JSON response indicating the authentication status.

    Args:
        request (HttpRequest): The HTTP request object containing metadata about the request.

    Returns:
        JsonResponse: A JSON response with the user's authentication status.
        - {"isauthenticated": False} if the user is not authenticated.
        - {"isauthenticated": True} if the user is authenticated.
    """
    if not request.user.is_authenticated:
        return JsonResponse({
            "isAuthenticated": False,
        })
        
    return JsonResponse({
        "isAuthenticated": True,
        "user id": request.user.id,
    })
    
    
def whoami_view(request):
    """
    Returns the username of the authenticated user.

    Args:
        request (HttpRequest): The HTTP request object containing metadata about the request.

    Returns:
        JsonResponse: A JSON response with the username of the authenticated user.
        - {"isauthenticated": False} if the user is not authenticated.
        - {"username": request.user.username} if the user is authenticated.
    """
    if not request.user.is_authenticated:
        return JsonResponse(
            {"isauthenticated": False}
        )
    return JsonResponse({
        "username": request.user.username,
    })

@api_view(('GET','POST'))
def RAMdata (request):
    #readRAMInfo()
    if request.method == 'GET':
        queryset=RAM.objects.all()
        data = []
        for i in queryset:
            p = Product.objects.get(product_id = i.product_id)
            ram_serializer = RAMSerializer(i)
            product_serializer = ProductSerializer(p)
            data.append(ram_serializer.data | product_serializer.data)
        return Response(data)
    
@api_view(('GET','POST'))
def HDDdata (request, *args, **kwargs):
    #readHDDInfo()
    if request.method == 'GET':
        queryset=HDD.objects.all()
        data = []
        for i in queryset:
            p = Product.objects.get(product_id = i.product_id)
            hdd_serializer = HDDSerializer(i)
            product_serializer = ProductSerializer(p)
            data.append(hdd_serializer.data | product_serializer.data)
        return Response(data)
    
@api_view(('GET','POST'))
def SSDdata (request, *args, **kwargs):
    #readSSDInfo()
    if request.method == 'GET':
        queryset=SSD.objects.all()
        data = []
        for i in queryset:
            p = Product.objects.get(product_id = i.product_id)
            ssd_serializer = SSDSerializer(i)
            product_serializer = ProductSerializer(p)
            data.append(ssd_serializer.data | product_serializer.data)
        return Response(data)
    
def getPurchaseList(order, idx):
    order_list = Order_Product.objects.filter(order_id = order.order_id)
    plist = []
    total_q = 0
    for j in order_list:
        p = Product.objects.get(product_id = j.product_id)
        if p.product_type == "RAM":
            tmp = RAM.objects.get(product_id = j.product_id)
            pname = tmp.ram_type + "("+ p.brand +")"
        elif p.product_type == "HDD":
            tmp = HDD.objects.get(product_id = j.product_id)
            pname = tmp.hdd_type + "("+ p.brand +")"
        elif p.product_type == "SSD":
            tmp = SSD.objects.get(product_id = j.product_id)
            pname = tmp.ssd_type + "("+ p.brand +")"
        plist.append({"product_id":p.product_id, "product_type": p.product_type, "price": p.price,"quantity" : j.quantity, "name": pname})
        total_q += j.quantity
    o = {"Total_Price": order.amount,"Order_Time": order.date_time, "order_id": idx, "Product": plist}

    return o

def addPurchaseList_view(request):
    #缺 userid
    try:
        userid = request.session["is_login"] #request.user.id #測試用
        cart_product = Cart.objects.filter(user_id = userid)
        amount = 0
        has_order_unchecked = 0
        try:
            try:
                existing_order = Order.objects.get(user_id = userid, submitted = False)
                maxid = existing_order.order_id
                amount = existing_order.amount
                has_order_unchecked = 1
            except:
                maxid = Order.objects.latest('order_id').order_id + 1
        except:
            maxid = 0
        
        for p in cart_product:
            query = 'quantity' + str(p.product_id)
            quantity = request.POST.get(query)
            order_products = Order_Product(order_id = maxid, product_id = p.product_id, quantity = quantity)
            order_products.save()
            p = Product.objects.get(product_id = p.product_id)
            amount += p.price*int(quantity)
        if has_order_unchecked == 0:
            order = Order(order_id = maxid, user_id = userid, amount = amount, date_time = datetime.now(), submitted = False)
            order.save()
        else:
            existing_order.amount = amount
            existing_order.date_time = datetime.now()
            existing_order.save()

        return redirect("/order")
    except:
        messages.warning(request, "You need to log in first")
        return redirect("/login/")

@api_view(['GET'])
def getPurchaseList_view(request):
    try:
        userid = request.session["is_login"] 
        try:
            order = Order.objects.get(user_id = userid, submitted = False)
            order_list = getPurchaseList(order, 1)
            return Response(order_list)
        except:
            return JsonResponse({"Total_Price": 0})
    except:
        messages.warning(request, "You need to log in first")
        return redirect("/login/")
        
def removePurchaseList_view(request):
    #缺 userid
    try:
        userid = request.session["is_login"] 
        checkout = request.POST.get('confirm')

        if checkout == "0":
            order = Order.objects.get(user_id = userid, submitted = False)
            p = Order_Product.objects.filter(order_id = order.order_id)
            p.delete()
            order.delete()
        else:
            order = Order.objects.get(user_id = userid, submitted = False)
            order.submitted = True
            order.date_time = datetime.now()
            order.save()
            order_product = Order_Product.objects.filter(order_id = order.order_id)
            for i in order_product:
                p = Product.objects.get(product_id = i.product_id)
                p.left -= int(i.quantity)
                p.save()
        return redirect("/home")
    except:
        messages.warning(request, "You need to log in first")
        return redirect("/login/")
    
    
@api_view(['GET'])
def getOrderHistory_view(request):
    try:
        userid = request.session["is_login"] 
    except:
        messages.warning(request, "You need to log in first")
        return redirect("/login/")
    order_history = []
    orders = Order.objects.filter(user_id = userid, submitted = True)
    if orders.count()==0:
        return Response([{"Total_Price": 0}])
    for order in range(len(orders)):
        order_history.append(getPurchaseList(orders[order], order+1))
    return Response(order_history)
        

def add_to_cart(request):
    try:
        user_id = request.session["is_login"] 
        product_id = request.POST.get('ProductID')
        page = request.POST.get('page')

        # Check if product exists
        if not Product.objects.filter(product_id=product_id).exists():
            return Response({"error": "Product does not exist"})

        # Check if product is out of stock
        product = Product.objects.get(product_id=product_id)
        if product.left <= 0:
            return Response({"error": "Product is out of stock"})

        #  Check if product is already in cart
        if Cart.objects.filter(user_id=user_id, product_id=product_id).exists():
            return Response({"error": "Product is already in cart"})

        # add to cart
        Cart.objects.create(user_id=user_id, product_id=product_id)

        if page == "ram":
            return redirect("/ram")
        elif page == "ssd":
            return redirect("/ssd")
        elif page == "hdd":
            return redirect("/hdd")

    except KeyError:
        messages.warning(request, "You need to log in first")
        return redirect("/login/")


def remove_from_cart(request):
    try:
        user_id = request.session["is_login"] 
        product_id = request.POST.get('ProductID')

        # Check if product exists
        cart_item = Cart.objects.filter(user_id=user_id, product_id=product_id)
        if not cart_item.exists():
            return Response({"error": "Product is not in cart"})

        # remove from cart
        cart_item.delete()

        return redirect("/ram")

    except KeyError:
        messages.warning(request, "You need to log in first")
        return redirect("/login/")


@api_view(["GET"])
def get_cart(request):
    try:
        try:
            user_id = request.session["is_login"] 
        except:
            messages.warning(request, "You need to log in first")
            return redirect("/login/")

        # Fetch cart items
        cart_items = Cart.objects.filter(user_id=user_id)
        if not cart_items.exists():
            return Response({"cart": "None"})

        # Create product list
        products = []
        for item in cart_items:
            product = Product.objects.get(product_id=item.product_id)
            product_serializer = ProductSerializer(product)
            if product.product_type == "RAM":
                tmp = RAM.objects.get(product_id = item.product_id)
                pname = tmp.ram_type + "("+ product.brand +")"
            elif product.product_type == "HDD":
                tmp = HDD.objects.get(product_id = item.product_id)
                pname = tmp.hdd_type + "("+ product.brand +")"
            elif product.product_type == "SSD":
                tmp = SSD.objects.get(product_id = item.product_id)
                pname = tmp.ssd_type + "("+ product.brand +")"
            products.append(product_serializer.data|{"quantity": 1, "name": pname})

        return Response({"cart": products})
    except Exception as e:
        return JsonResponse({"cart": "None"})


@api_view(["POST"])
def create_collection(request):
    try:
        try:
            user_id = request.session["is_login"] 
        except:
            messages.warning(request, "You need to log in first")
            return redirect("/login/")
        collection_name = request.data["collection_name"]
        product_id = request.data.get("product_id")  # allow empty product_id

        # Check if collection name already exists
        if Collection.objects.filter(
            user_id=user_id, collection_name=collection_name
        ).exists():
            return Response({"error": "Collection already exists"})

        if product_id is not None:
            # Chek if product exists
            if not Product.objects.filter(product_id=product_id).exists():
                return Response({"error": "Product does not exist"})

        # create new collection
        collection = Collection.objects.create(
            user_id=user_id, collection_name=collection_name, product_id=product_id
        )
        return Response(
            {
                "message": "Collection created successfully",
                "collection_id": collection.collection_id,
                "collection_name": collection.collection_name,
            }
        )

    except KeyError:
        return Response({"error": "Invalid data"})


@api_view(["DELETE"])
def delete_collection(request):
    try:
        try:
            user_id = request.session["is_login"] 
        except:
            messages.warning(request, "You need to log in first")
            return redirect("/login/")
        collection_name = request.data["collection_name"]

        # Check if collection exists
        collections = Collection.objects.filter(
            user_id=user_id, collection_name=collection_name
        )

        if not collections.exists():
            return Response({"error": "Collection not found"})

        # delete all collections with the same name
        collections.delete()
        return Response({"message": "Collection deleted successfully"})

    except KeyError:
        return Response({"error": "Invalid data"})


@api_view(["POST"])
def add_to_collection(request):
    try:
        try:
            user_id = request.session["is_login"] 
        except:
            messages.warning(request, "You need to log in first")
            return redirect("/login/") 
        collection_name = request.data["collection_name"]
        product_id = request.data["product_id"]

        # Check if product exists
        if not Product.objects.filter(product_id=product_id).exists():
            return Response({"error": "Product does not exist"})

        # Check if collection exists
        if not Collection.objects.filter(
            user_id=user_id, collection_name=collection_name
        ).exists():
            return Response({"error": "Collection does not exist"})

        # Check if product is already in the collection
        if Collection.objects.filter(
            user_id=user_id, collection_name=collection_name, product_id=product_id
        ).exists():
            return Response({"error": "Product is already in the collection"})

        # Add product to collection
        Collection.objects.create(
            user_id=user_id, collection_name=collection_name, product_id=product_id
        )

        return Response({"message": "Product added to collection successfully"})

    except KeyError:
        return Response({"error": "Invalid data"})


@api_view(["DELETE"])
def remove_from_collection(request):
    try:
        collection_id = request.data["collection_id"]

        # Check if the collection exists
        collection = Collection.objects.filter(collection_id=collection_id).first()

        if not collection:
            return Response({"error": "Collection not found"})

        collection.delete()

        return Response({"message": "Product removed from collection successfully"})

    except KeyError:
        return Response({"error": "Invalid data"})


@api_view(["GET"])
def get_collection_products(request):
    try:
        try:
            user_id = request.session["is_login"] 
        except:
            messages.warning(request, "You need to log in first")
            return redirect("/login/")
        collection_name = request.query_params.get("collection_name")

        if not user_id or not collection_name:
            return Response({"error": "User ID and collection name are required"})

        # Get products in collection
        collections = Collection.objects.filter(
            user_id=user_id, collection_name=collection_name
        )

        if not collections.exists():
            return Response({"message": "Collection is empty or does not exist"})

        # Create product list

        products = []
        for item in collections:
            product = Product.objects.get(product_id=item.product_id)
            product_serializer = ProductSerializer(product)
            products.append(product_serializer.data)

        return Response({"collection": collection_name, "products": products})

    except Exception as e:
        return Response({"error": str(e)})


@api_view(["GET"])
def get_user_collections(request):
    try:
        user_id = request.session["is_login"] 

        if not user_id:
            return Response({"error": "User ID is required"})

        # Get user's collections
        collections = (
            Collection.objects.filter(user_id=user_id)
            .values("collection_name")
            .distinct()
        )

        if not collections.exists():
            return Response({"message": "No collections found for this user"})

        # Create collection list
        collection_list = [collection["collection_name"] for collection in collections]

        return Response({"user_id": user_id, "collections": collection_list})

    except Exception as e:
        return Response({"error": str(e)})
