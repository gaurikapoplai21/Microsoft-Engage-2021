from datetime import datetime,timedelta


def scheduler(dates,slots,duration,names,emails,teamNames,teamIds):
    
    response = dict()
    index = 0
    for i in range(len(slots)):
        numSlots = int(slots[i])
        date = dates[i]
        #time = datetime.strptime(dates[i],"%Y-%m-%dT%H:%M:%S+05:30")[11:19]
        time = dates[i]
        for j in range(numSlots):
            response[teamIds[index]] = {
               "startDate" : datetime.strftime(date,"%Y-%m-%dT%H:%M:%S+05:30")[:10],
               "duration" : duration + " minutes",
               "names" : names[index],
               "emails": emails[index],
               "teamName" : teamNames[index],
               "startTime": datetime.strftime(time,"%Y-%m-%dT%H:%M:%S+05:30")[11:19]

            }
            index += 1
            time_change = timedelta(minutes=int(duration))
            time += time_change

    print(response)
    return response


            

