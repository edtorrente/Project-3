import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
engine = create_engine('postgresql+psycopg2://postgres:199415011994Hai@localhost/Project_3_ev_stations')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

#Save reference to the table:
alt_fuel_stations = Base.classes.alt_fuel_stations
statesco2_emission = Base.classes.statesco2_emission
usandworldco2 =Base.classes.usandworldco2



# Initiate Flask Application
app = Flask(__name__)



# Routing do define url
@app.route('/')
def startingPage():
    return render_template("map.html")

@app.route("/group5/evmaps")
def evStationMaps():
    session = Session(engine)

    results = session.query(alt_fuel_stations.longitude, alt_fuel_stations.latitude, alt_fuel_stations.id).all()
    evStation = []

    session.close()

    for lon, lat, stationID in results:
        stations_dict = {}
        stations_dict["longitude"] = lon
        stations_dict["latitude"] = lat
        stations_dict['stationID'] = stationID
        evStation.append(stations_dict)

    return jsonify(evStation)



# @app.route()
# def statesco2_emission("/group5/stateco2"):


# @app.route()
# def usandworldco2("/group5/usandworld"):
       


if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(debug=True)