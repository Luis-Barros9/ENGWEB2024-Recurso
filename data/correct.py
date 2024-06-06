import json
import ast
import re


def strToDouble(input_string):
    # converts a string in format of double to a double or keep as string
    # for example "2.5" -> 2.5
    # for example "2" -> 2
    # for example "dak" -> "dak"
    try:
        return int(input_string)
    except:
        try:
            return float(input_string)
        except:
            return None


def strToList(input_string):
    '''
    Convert a string in format of list to a list
    for Example"['District 12, Panem', 'Capitol, Panem', 'Panem (United States)']" -> ['District 12, Panem', 'Capitol, Panem', 'Panem (United States)']
    '''
    return ast.literal_eval(input_string)

def removeId(data):
    '''
    extract id from string
    "2767052-the-hunger-games" -> 2767052
    "2767052.the-hunger-games" -> 2767052
    '''
    match = re.match(r'^(\d+)[\.\-]\w+', data)
    return int(match.group(1)) if match else None

'''
    {
        "bookId": "2767052-the-hunger-games",
        "title": "The Hunger Games",
        "series": "The Hunger Games #1",
        "author": "Suzanne Collins",
        "rating": "4.33",
        "description": "WINNING MEANS FAME AND FORTUNE.LOSING MEANS CERTAIN DEATH.THE HUNGER GAMES HAVE BEGUN. . . .In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and once girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.Sixteen-year-old Katniss Everdeen regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before\u2014and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love.",
        "language": "English",
        "isbn": "9780439023481",
        "genres": "['Young Adult', 'Fiction', 'Dystopia', 'Fantasy', 'Science Fiction', 'Romance', 'Adventure', 'Teen', 'Post Apocalyptic', 'Action']",
        "characters": "['Katniss Everdeen', 'Peeta Mellark', 'Cato (Hunger Games)', 'Primrose Everdeen', 'Gale Hawthorne', 'Effie Trinket', 'Haymitch Abernathy', 'Cinna', 'President Coriolanus Snow', 'Rue', 'Flavius', 'Lavinia (Hunger Games)', 'Marvel', 'Glimmer', 'Clove', 'Foxface', 'Thresh', 'Greasy Sae', 'Madge Undersee', 'Caesar Flickerman', 'Claudius Templesmith', 'Octavia (Hunger Games)', 'Portia (hunger Games)']",
        "bookFormat": "Hardcover",
        "edition": "First Edition",
        "pages": "374",
        "publisher": "Scholastic Press",
        "publishDate": "09/14/08",
        "firstPublishDate": "",
        "awards": "['Locus Award Nominee for Best Young Adult Book (2009)', 'Georgia Peach Book Award (2009)', 'Buxtehuder Bulle (2009)', 'Golden Duck Award for Young Adult (Hal Clement Award) (2009)', \"Grand Prix de l'Imaginaire Nominee for Roman jeunesse \u00e9tranger (2010)\", 'Books I Loved Best Yearly (BILBY) Awards for Older Readers (2012)', \"West Australian Young Readers' Book Award (WAYRBA) for Older Readers (2010)\", \"Red House Children's Book Award for Older Readers & Overall (2010)\", 'South Carolina Book Award for Junior and Young Adult Book (2011)', 'Charlotte Award (2010)', 'Colorado Blue Spruce Young Adult Book Award (2010)', 'Teen Buckeye Book Award (2009)', \"Pennsylvania Young Readers' Choice Award for Young Adults (2010)\", 'Rhode Island Teen Book Award (2010)', \"Dorothy Canfield Fisher Children's Book Award (2010)\", 'Evergreen Teen Book Award (2011)', 'Soaring Eagle Book Award (2009)', 'Milwaukee County Teen Book Award Nominee (2010)', 'Sakura Medal for Middle School Book (2010)', 'Michigan Library Association Thumbs Up! Award (2009)', 'Florida Teens Read (2009)', 'Deutscher Jugendliteraturpreis for Preis der Jugendjury (2010)', 'Iowa High School Book Award (2011)', 'New Mexico Land of Enchantment Award for Young Adult (2011)', 'Eliot Rosewater Indiana High School Book Award (2010)', 'The Inky Awards for Silver Inky (2009)', 'California Young Readers Medal for Young Adult (2011)', 'Lincoln Award (2011)', 'Kinderboekwinkelprijs (2010)', 'Missouri Truman Readers Award (2011)', 'CYBILS Award for Young Adult Fantasy & Science Fiction (2008)', 'Literaturpreis der Jury der jungen Leser for Jugendbuch (2010)', 'The Inky Awards Shortlist for Silver Inky (2009)', 'Prix Et-lisez-moi (2011)', 'Missouri Gateway Readers Award (2011)', 'Oklahoma Sequoyah Award for High School and Intermediate (2011)', 'Premio El Templo de las Mil Puertas for Mejor novela extranjera perteneciente a saga (2009)', \"Rebecca Caudill Young Readers' Book Award (2011)\", 'LovelyBooks Leserpreis for Fantasy (2009)', 'LovelyBooks Leserpreis for Bestes Cover/Umschlag (2009)', 'Premi Protagonista Jove for Categoria 13-14 anys (2010)']",
        "numRatings": "6376780",
        "ratingsByStars": "['3444695', '1921313', '745221', '171994', '93557']",
        "likedPercent": "96",
        "setting": "['District 12, Panem', 'Capitol, Panem', 'Panem (United States)']",
        "coverImg": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1586722975l/2767052.jpg",
        "bbeScore": "2993816",
        "bbeVotes": "30516",
        "price": "5.09"
'''

if __name__ =="__main__":
    with open("dataset.json", "r") as f:
        data = json.load(f)
    set_id = set()
    bd =[]
    lists = ["genres", "characters", "awards", "ratingsByStars", "setting"]
    numbers = ["rating", "pages", "numRatings", "likedPercent", "bbeScore", "bbeVotes", "price"]
    for element in data:
        item ={}
        for key, value in element.items():
            if value!="":
                if key in lists:
                    if key == "ratingsByStars":
                        item[key] = []
                        x = strToList(value)
                        for elem in x:
                            y = strToDouble(elem)
                            if y != None:
                                item[key].append(y)
                    else:
                        item[key] = strToList(value)

                elif key in numbers:
                    y= strToDouble(value)
                    if y != None:
                        item[key] = strToDouble(value)
                else:
                    if key == "_id":
                        id = removeId(value)
                        if id is None or id in set_id:
                            print("id repetido ou inválido")
                            print(value)
                            continue
                        item["_id"] = id
                        set_id.add(id)
                    else:
                        item[key] = value
        if item:
            bd.append(item)
    
    with open("data.json", "w") as f:
        json.dump(bd, f, indent=4,ensure_ascii=False)
